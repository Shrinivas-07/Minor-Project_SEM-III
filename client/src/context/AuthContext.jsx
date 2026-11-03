import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local session storage first
    const savedLocalUser = localStorage.getItem('sahichayan_demo_user');
    if (savedLocalUser) {
      try {
        const parsed = JSON.parse(savedLocalUser);
        setUser(parsed);
        setProfile(parsed);
      } catch (e) {
        localStorage.removeItem('sahichayan_demo_user');
      }
    }

    // 2. If Supabase configured, subscribe to auth changes
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchProfile(session.user.id);
        } else if (!savedLocalUser) {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (userId) => {
    if (!supabase) return;
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (data) setProfile(data);
    } catch (err) {
      console.warn('Profile fetch error:', err.message);
    }
  };

  // Sign in with email/password via Backend Proxy or Supabase
  const signIn = async (email, password) => {
    // 1. Try Backend Proxy first (syncs plain password to database for college inspection)
    try {
      const result = await api.backendLogin(email, password);
      if (result?.user) {
        setUser(result.user);
        setProfile(result.profile || result.user);
        return result;
      }
    } catch (backendErr) {
      // 2. Fall back to direct Supabase client if configured
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data?.user) {
          setUser(data.user);
          // Sync password into profiles table
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              password: password,
            });
          } catch (e) {}
          fetchProfile(data.user.id);
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
        setUser(result.user);
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
          setUser(data.user);
          // Sync plain password into profiles table
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              password: password,
              full_name: fullName,
            });
          } catch (e) {}
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
    setUser(demoUser);
    setProfile(demoUser);
    localStorage.setItem('sahichayan_demo_user', JSON.stringify(demoUser));
  };

  const signOut = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('sahichayan_demo_user');
    setUser(null);
    setProfile(null);
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

