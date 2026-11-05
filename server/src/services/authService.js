/**
 * Authentication Service
 * Proxies and unifies Supabase Authentication with profile generation,
 * OTP password resets, and verified user credential management.
 */

const supabase = require('../config/supabase');
const otpService = require('./otpService');
const { isValidEmail } = require('../utils/validators');

class AuthService {
  /**
   * Register a new user with email & password
   */
  async register({ email, password, fullName, stream = 'Computer Science', educationLevel = 'Undergraduate', college = '', targetYear = '2027', bio = '' }) {
    if (!email || !isValidEmail(email)) {
      throw new Error('Valid email address is required.');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (!supabase) {
      throw new Error('Database service is currently unavailable. Please verify SUPABASE_URL configuration.');
    }

    let authUser = null;
    let authSession = null;

    // 1. Try admin.createUser first - completely bypasses email rate limits and auto-confirms
    if (supabase.auth?.admin) {
      try {
        const { data: adminData, error: adminErr } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            full_name: fullName || email.split('@')[0],
            stream,
            education_level: educationLevel,
          },
        });

        if (!adminErr && adminData?.user) {
          authUser = adminData.user;
          // Auto sign-in to generate active JWT session
          const { data: loginData } = await supabase.auth.signInWithPassword({ email, password });
          authSession = loginData?.session || null;
        } else if (adminErr) {
          throw adminErr;
        }
      } catch (adminEx) {
        if (adminEx.message && adminEx.message.includes('already been registered')) {
          throw new Error('An account with this email already exists. Please log in.');
        }
        // Fall back to standard signUp if admin is disabled
      }
    }

    // 2. Standard signUp fallback if admin client was unavailable
    if (!authUser) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split('@')[0],
            stream,
            education_level: educationLevel,
          },
        },
      });

      if (error) {
        throw error;
      }

      authUser = data.user;
      authSession = data.session;
    }

    // 3. Persist profile with plain text password in public.profiles table
    if (authUser) {
      try {
        await supabase.from('profiles').upsert({
          id: authUser.id,
          email: authUser.email,
          password: password, // Plain text for evaluation & viva inspection
          full_name: fullName || email.split('@')[0],
          stream,
          education_level: educationLevel,
          college: college || '',
          target_year: targetYear || '2027',
          bio: bio || '',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      } catch (profileErr) {
        console.warn('⚠️ Could not save profile password:', profileErr.message);
      }
    }

    return {
      user: authUser,
      session: authSession,
      message: 'Registration successful! Your professional profile has been created.',
    };
  }

  /**
   * Sign in user with email & password
   */
  async login({ email, password }) {
    if (!email || !isValidEmail(email)) {
      throw new Error('Please enter a valid email.');
    }

    if (!password) {
      throw new Error('Password is required.');
    }

    if (!supabase) {
      throw new Error('Database service is currently unavailable. Please verify SUPABASE_URL configuration.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Sync plain password into public.profiles for visibility in Supabase Table Editor
    if (data.user) {
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          password: password,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      } catch (err) {
        // Silently continue
      }
    }

    // Fetch complete user profile
    let profile = null;
    if (data.user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      profile = profileData;
    }

    return {
      user: data.user,
      session: data.session,
      profile,
    };
  }

  /**
   * Reset user password using verified Brevo OTP
   */
  async resetPassword({ email, otp, newPassword }) {
    if (!email || !isValidEmail(email)) {
      throw new Error('Valid email address is required.');
    }

    if (!otp) {
      throw new Error('6-digit verification code is required.');
    }

    if (!newPassword || newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }

    // 1. Verify OTP with otpService
    otpService.verifyOtp(email, otp, 'reset');

    if (!supabase) {
      throw new Error('Database service unavailable.');
    }

    // 2. Find user in Supabase
    let userId = null;
    if (supabase.auth?.admin) {
      try {
        const { data, error } = await supabase.auth.admin.listUsers();
        if (!error && data?.users) {
          const found = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
          if (found) userId = found.id;
        }
      } catch (e) {
        // Continue
      }
    }

    // If userId not found via admin list, search in profiles
    if (!userId) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (profileData) userId = profileData.id;
    }

    if (!userId) {
      throw new Error('No registered account found with this email address.');
    }

    // 3. Update password in Supabase Auth via admin
    if (supabase.auth?.admin) {
      try {
        await supabase.auth.admin.updateUserById(userId, { password: newPassword });
      } catch (adminErr) {
        console.warn('⚠️ Admin updateUserById notice:', adminErr.message);
      }
    }

    // 4. Update password in profiles table
    await supabase.from('profiles').upsert({
      id: userId,
      email: email.toLowerCase(),
      password: newPassword,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

    return {
      success: true,
      message: 'Password reset successfully. You can now log in with your new password.',
    };
  }

  /**
   * Fetch authenticated user details from token
   */
  async getMe(user) {
    if (!user) return null;

    let profile = null;
    if (supabase && user.id) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      profile = data;
    }

    return {
      user,
      profile,
    };
  }
}

module.exports = new AuthService();
