import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { api } from '../services/api';

const AuthContext = createContext();

// Synchronous hydration from localStorage on page load (prevents logout flicker on refresh)
function getInitialUser() {
  try {
    const saved = localStorage.getItem('sahichayan_active_user') || localStorage.getItem('sahichayan_demo_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function getInitialProfile() {
  try {
    const saved = localStorage.getItem('sahichayan_active_profile') || localStorage.getItem('sahichayan_demo_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [profile, setProfile] = useState(getInitialProfile);
  const [loading, setLoading] = useState(false);

  // Centralized session persistence helper
  const persistSession = (userData, profileData = null, token = null) => {
    if (!userData) {
      localStorage.removeItem('sahichayan_active_user');
      localStorage.removeItem('sahichayan_active_profile');
      localStorage.removeItem('sahichayan_auth_token');
      localStorage.removeItem('sahichayan_demo_user');
      setUser(null);
      setProfile(null);
      return;
    }

    const effectiveProfile = profileData || userData;
    setUser(userData);
    setProfile(effectiveProfile);

    try {
      localStorage.setItem('sahichayan_active_user', JSON.stringify(userData));
      localStorage.setItem('sahichayan_active_profile', JSON.stringify(effectiveProfile));
      if (token) {
        localStorage.setItem('sahichayan_auth_token', token);
      }
    } catch (err) {
      console.warn('Could not write auth to localStorage:', err);
    }
  };

  useEffect(() => {
    // Check Supabase session if configured
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const u = session.user;
          const token = session.access_token;
          fetchProfile(u.id).then((p) => {
            persistSession(u, p || u, token);
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          persistSession(null);
        } else if (session?.user) {
          fetchProfile(session.user.id).then((p) => {
            persistSession(session.user, p || session.user, session.access_token);
          });
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const fetchProfile = async (userId) => {
    if (!supabase || !userId) return null;
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
      if (data) {
        setProfile(data);
        localStorage.setItem('sahichayan_active_profile', JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Profile fetch notice:', err.message);
    }
    return null;
  };

  // Sign in with email/password via Backend Proxy or Supabase
  const signIn = async (email, password) => {
    // 1. Try Backend Proxy first (syncs plain password to database for college inspection)
    try {
      const result = await api.backendLogin(email, password);
      if (result?.user) {
        persistSession(result.user, result.profile || result.user, result.session?.access_token);
        return result;
      }
    } catch (backendErr) {
      // 2. Fall back to direct Supabase client if configured
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data?.user) {
          // Sync password into profiles table
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              password: password,
            });
          } catch (e) {}

          const p = await fetchProfile(data.user.id);
          persistSession(data.user, p || data.user, data.session?.access_token);
        }
        return data;
      }
      throw new Error(backendErr.message || 'Login failed.');
    }
  };

  // Sign up with Backend Proxy or Supabase
  const signUp = async (email, password, fullName) => {
    // 1. Try Backend Proxy first (bypasses email rate limits via admin auth and saves password)
    try {
      const result = await api.backendRegister(email, password, fullName);
      if (result?.user) {
        const newProfile = {
          id: result.user.id,
          email: result.user.email,
          full_name: fullName,
          password: password,
        };
        persistSession(result.user, newProfile, result.session?.access_token);
        return result;
      }
    } catch (backendErr) {
      // 2. Fall back to direct Supabase client
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        if (data?.user) {
          // Sync plain password into profiles table
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              password: password,
              full_name: fullName,
            });
          } catch (e) {}

          const newProfile = {
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            password: password,
          };
          persistSession(data.user, newProfile, data.session?.access_token);
        }
        return data;
      }
      throw new Error(backendErr.message || 'Registration failed.');
    }
  };

  // Instant Demo Login (for presentation & testing)
  const loginDemoUser = (customName = 'Shrinivas K.') => {
    const demoUser = {
      id: 'demo-user-101',
      email: 'student@sahichayan.com',
      full_name: customName,
      education_level: 'B.Tech Computer Science (3rd Sem)',
      stream: 'Engineering & Technology',
      bio: 'Aspiring software architect exploring AI and high-scale systems.',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isDemo: true
    };
    persistSession(demoUser, demoUser, 'demo-token');
    localStorage.setItem('sahichayan_demo_user', JSON.stringify(demoUser));
  };

  const signOut = async () => {
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    persistSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        loginDemoUser,
        isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
