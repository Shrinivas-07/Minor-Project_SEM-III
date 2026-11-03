/**
 * Authentication Service
 * Proxies and unifies Supabase Authentication with profile generation
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

    // Ensure profile row exists
    if (data.user) {
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName || email.split('@')[0],
          stream,
          education_level: educationLevel,
        }, { onConflict: 'id' });
      } catch (profileErr) {
        // Trigger might have already handled it
      }
    }

    return {
      user: data.user,
      session: data.session,
      message: data.session ? 'Registration successful!' : 'Registration successful! Please confirm your email if required.',
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

