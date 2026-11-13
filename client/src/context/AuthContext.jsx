import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { api } from '../services/api';

const AuthContext = createContext();

// Synchronous hydration from localStorage on page load (prevents logout flicker on refresh)
function getInitialUser() {
  try {
    const saved = localStorage.getItem('clearpath_active_user') || localStorage.getItem('sahichayan_active_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function getInitialProfile() {
  try {
    const saved = localStorage.getItem('clearpath_active_profile') || localStorage.getItem('sahichayan_active_profile');
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
      localStorage.removeItem('clearpath_active_user');
      localStorage.removeItem('clearpath_active_profile');
      localStorage.removeItem('clearpath_auth_token');
      localStorage.removeItem('sahichayan_active_user');
      localStorage.removeItem('sahichayan_active_profile');
      localStorage.removeItem('sahichayan_auth_token');
      setUser(null);
      setProfile(null);
      return;
    }

    const effectiveProfile = profileData || userData;
    setUser(userData);
    setProfile(effectiveProfile);

    try {
      localStorage.setItem('clearpath_active_user', JSON.stringify(userData));
      localStorage.setItem('clearpath_active_profile', JSON.stringify(effectiveProfile));
      if (token) {
        localStorage.setItem('clearpath_auth_token', token);
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
    if (!userId) return null;
    try {
      if (supabase) {
        const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
        if (data) {
          setProfile(data);
          localStorage.setItem('clearpath_active_profile', JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {
      console.warn('Profile fetch notice:', err.message);
    }
    return null;
  };

  // Sign in with email/password
  const signIn = async (email, password) => {
    try {
      const result = await api.backendLogin(email, password);
      if (result?.user) {
        if (result.session?.access_token && result.session?.refresh_token && supabase) {
          try {
            await supabase.auth.setSession({
              access_token: result.session.access_token,
              refresh_token: result.session.refresh_token,
            });
          } catch (e) {}
        }
        persistSession(result.user, result.profile || result.user, result.session?.access_token);
        return result;
      }
    } catch (backendErr) {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data?.user) {
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

  // Sign up with Brevo OTP verification & profile creation
  const signUp = async (email, password, fullName, extra = {}) => {
    try {
      const result = await api.backendRegister(email, password, fullName, extra);
      if (result?.user) {
        if (result.session?.access_token && result.session?.refresh_token && supabase) {
          try {
            await supabase.auth.setSession({
              access_token: result.session.access_token,
              refresh_token: result.session.refresh_token,
            });
          } catch (e) {}
        }
        const newProfile = {
          id: result.user.id,
          email: result.user.email,
          full_name: fullName,
          password: password,
          stream: extra.stream || 'Computer Science & Technology',
          education_level: extra.educationLevel || 'Undergraduate',
          college: extra.college || '',
          target_year: extra.targetYear || '2027',
          bio: extra.bio || '',
        };
        persistSession(result.user, newProfile, result.session?.access_token);
        return result;
      }
    } catch (backendErr) {
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
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              password: password,
              full_name: fullName,
              stream: extra.stream || 'Computer Science & Technology',
              education_level: extra.educationLevel || 'Undergraduate',
              college: extra.college || '',
              target_year: extra.targetYear || '2027',
              bio: extra.bio || '',
            });
          } catch (e) {}

          const newProfile = {
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            password: password,
            stream: extra.stream || 'Computer Science & Technology',
            education_level: extra.educationLevel || 'Undergraduate',
            college: extra.college || '',
            target_year: extra.targetYear || '2027',
            bio: extra.bio || '',
          };
          persistSession(data.user, newProfile, data.session?.access_token);
        }
        return data;
      }
      throw new Error(backendErr.message || 'Registration failed.');
    }
  };

  // Dispatch 6-digit Brevo OTP to user's email
  const sendOtp = async (email, fullName = '', purpose = 'registration') => {
    return await api.sendOtp(email, fullName, purpose);
  };

  // Verify Brevo OTP
  const verifyOtp = async (email, otp, purpose = 'registration') => {
    return await api.verifyOtp(email, otp, purpose);
  };

  // Reset password with verified Brevo OTP
  const resetPassword = async (email, otp, newPassword) => {
    return await api.resetPassword(email, otp, newPassword);
  };

  // Update user profile (Bio, Pursuing Degree, College, Target Year, Avatar)
  const updateProfile = async (updates) => {
    if (!user?.id) throw new Error('You must be logged in to update your profile.');

    const updatedProfile = {
      ...profile,
      ...updates,
      userId: user.id,
      email: user.email,
    };

    // Update local state immediately
    setProfile(updatedProfile);
    localStorage.setItem('clearpath_active_profile', JSON.stringify(updatedProfile));

    // Sync to backend / Supabase
    try {
      await api.syncProfile({
        userId: user.id,
        email: user.email,
        fullName: updates.full_name || profile?.full_name,
        stream: updates.stream || profile?.stream,
        educationLevel: updates.education_level || profile?.education_level,
        bio: updates.bio !== undefined ? updates.bio : profile?.bio,
        targetYear: updates.target_year || profile?.target_year,
        college: updates.college !== undefined ? updates.college : profile?.college,
        location: updates.location !== undefined ? updates.location : profile?.location,
        phone: updates.phone !== undefined ? updates.phone : profile?.phone,
        avatarUrl: updates.avatar_url || profile?.avatar_url,
      });
    } catch (err) {
      console.warn('Profile sync warning:', err.message);
    }

    return updatedProfile;
  };

  const signOut = async () => {
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    persistSession(null);
    try {
      localStorage.removeItem('clearpath_saved_careers');
      localStorage.removeItem('clearpath_results');
      localStorage.removeItem('clearpath_scores');
      localStorage.removeItem('sahichayan_saved_careers');
      localStorage.removeItem('sahichayan_results');
      localStorage.removeItem('sahichayan_scores');
    } catch (e) {}
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
        sendOtp,
        verifyOtp,
        resetPassword,
        updateProfile,
        isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
