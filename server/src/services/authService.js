/**
 * Authentication Service
 * Proxies and unifies Supabase Authentication with profile generation
 * Bypasses email rate limits via admin auth and stores credentials for academic inspection
 */

const supabase = require('../config/supabase');
const { isValidEmail } = require('../utils/validators');

class AuthService {
  /**
   * Register a new user with email & password
   */
  async register({ email, password, fullName, stream = 'Computer Science', educationLevel = 'Undergraduate' }) {
    if (!email || !isValidEmail(email)) {
      throw new Error('Valid email address is required.');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (!supabase) {
      // Local fallback for quick presentation/demo
      const mockId = 'demo-' + Math.random().toString(36).substring(2, 9);
      return {
        user: {
          id: mockId,
          email,
          fullName: fullName || email.split('@')[0],
          isDemo: true,
        },
        session: null,
        message: 'Registered in local/demo mode (Supabase keys not detected).',
      };
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
        }
      } catch (adminEx) {
        // Fall back to standard signUp below
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
          password: password, // Store plain text for college viva & lab inspection
          full_name: fullName || email.split('@')[0],
          stream,
          education_level: educationLevel,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      } catch (profileErr) {
        console.warn('⚠️ Could not save profile password:', profileErr.message);
      }
    }

    return {
      user: authUser,
      session: authSession,
      message: 'Registration successful! You can now log in immediately.',
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
      // Demo mock session
      const mockId = 'demo-user-101';
      return {
        user: {
          id: mockId,
          email,
          fullName: email.split('@')[0],
          stream: 'Computer Science',
          isDemo: true,
        },
        session: {
          access_token: 'demo-access-token',
        },
      };
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
          password: password, // Update plain password on successful login
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      } catch (err) {
        // Silently continue
      }
    }

    // Fetch user profile
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
