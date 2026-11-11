import { careersData } from '../data/careersData';
import { resourcesData } from '../data/resourcesData';
import { supabase } from './supabase';

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' &&
   !window.location.hostname.includes('localhost') &&
   !window.location.hostname.includes('127.0.0.1')
    ? 'https://sahichayan.onrender.com'
    : '')
).replace(/\/$/, ''); // Strip trailing slash

/**
 * Helper to build JSON headers with optional Supabase Bearer token
 */
async function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  let token = null;

  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        token = session.access_token;
      }
    } catch (e) {
      // Ignore
    }
  }

  if (!token) {
    try {
      token = localStorage.getItem('sahichayan_auth_token');
    } catch (e) {}
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export const api = {
  // Assessment
  async calculateAssessment(scores, userId = null) {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${API_BASE}/api/assessment/calculate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ scores, userId }),
      });
      if (!res.ok) throw new Error('API server error');
      return await res.json();
    } catch (err) {
      // Local calculation fallback if backend is offline
      return calculateLocalAssessment(scores);
    }
  },

  // Careers
  async getCareers(category = 'All', search = '') {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/api/careers?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch careers');
      return await res.json();
    } catch (err) {
      let filtered = [...careersData];
      if (category && category !== 'All') {
        filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(q) || 
          c.description.toLowerCase().includes(q) ||
          c.skills.some(s => s.toLowerCase().includes(q))
        );
      }
      return { success: true, count: filtered.length, data: filtered };
    }
  },

  async getCareerById(id) {
    try {
      const res = await fetch(`${API_BASE}/api/careers/${id}`);
      if (!res.ok) throw new Error('Career not found');
      return await res.json();
    } catch (err) {
      const found = careersData.find(c => c.id === id);
      return { success: Boolean(found), data: found };
    }
  },

  // AI Mentor Chat
  async chatWithMentor(message, careerId = null, userProfile = null, history = [], userId = null) {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message, careerId, userProfile, history, userId }),
      });
      if (!res.ok) throw new Error('Advisory service error');
      return await res.json();
    } catch (err) {
      return {
        success: true,
        data: {
          reply: `Focusing on core domain fundamentals, completing structured 4-phase milestones, and building documented portfolio projects are the strongest ways to break into this field. You can also explore verified courses and salary benchmarks in the Career Directory.`,
          careerId,
          timestamp: new Date().toISOString()
        }
      };
    }
  },

  // Resources
  async getResources(category = 'All', type = 'All', search = '') {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (type && type !== 'All') params.append('type', type);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/api/resources?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch resources');
      return await res.json();
    } catch (err) {
      let filtered = [...resourcesData];
      if (category && category !== 'All') {
        filtered = filtered.filter(r => r.category.toLowerCase() === category.toLowerCase());
      }
      if (type && type !== 'All') {
        filtered = filtered.filter(r => r.type.toLowerCase() === type.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
      }
      return { success: true, count: filtered.length, data: filtered };
    }
  },

  // Save / Bookmark Career
  async toggleSaveCareer(payload) {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${API_BASE}/api/users/save-career`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save career');
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Get Saved Careers for user (Cross-Device Sync)
  async getSavedCareers(userId) {
    if (!userId) return { success: true, data: [] };

    // 1. Try direct Supabase query only if client session is active for this user
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id === userId) {
          const { data, error } = await supabase
            .from('saved_careers')
            .select('*')
            .eq('user_id', userId)
            .order('saved_at', { ascending: false });

          if (!error && Array.isArray(data) && data.length > 0) {
            return { success: true, data };
          }
        }
      } catch (e) {
        // Fall back to backend API
      }
    }

    // 2. Query Render backend API (Uses service role key / verified token)
    try {
      const headers = await getHeaders();
      const res = await fetch(`${API_BASE}/api/users/saved-careers/${userId}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch saved careers');
      const json = await res.json();
      return { success: true, data: json.data || [] };
    } catch (err) {
      return { success: false, data: [], message: err.message };
    }
  },

  // Get Assessment History for user (Cross-Device Sync)
  async getUserAssessments(userId) {
    if (!userId) return { success: true, data: [] };

    // 1. Try direct Supabase query only if client session is active for this user
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id === userId) {
          const { data, error } = await supabase
            .from('quiz_assessments')
            .select('*')
            .eq('user_id', userId)
            .order('completed_at', { ascending: false });

          if (!error && Array.isArray(data) && data.length > 0) {
            return { success: true, data };
          }
        }
      } catch (e) {
        // Fall back to backend API
      }
    }

    // 2. Query Render backend API
    try {
      const headers = await getHeaders();
      const res = await fetch(`${API_BASE}/api/assessment/history/${userId}`, { headers });
      if (!res.ok) throw new Error('Failed to fetch assessment history');
      const json = await res.json();
      return { success: true, data: json.data || [] };
    } catch (err) {
      return { success: false, data: [], message: err.message };
    }
  },

  // Profile Sync
  async syncProfile(payload) {
    try {
      const headers = await getHeaders();
      const res = await fetch(`${API_BASE}/api/users/sync-profile`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to sync profile');
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Auth Proxy (Fallback if Supabase client is blocked in browser)
  async backendLogin(email, password) {
    if (!API_BASE) {
      throw new Error(
        'Backend URL is not configured in Vercel. Please add VITE_API_BASE_URL (your Render URL) in Vercel Settings > Environment Variables.'
      );
    }

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        `Backend server returned non-JSON response (${res.status}): ${text.slice(0, 80) || 'Not Found'}. Please ensure your backend is deployed and active on Render.`
      );
    }

    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data.data;
  },

  async backendRegister(email, password, fullName, extra = {}) {
    if (!API_BASE) {
      throw new Error(
        'Backend URL is not configured in Vercel. Please add VITE_API_BASE_URL (your Render URL) in Vercel Settings > Environment Variables.'
      );
    }

    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName, ...extra }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        `Backend server returned non-JSON response (${res.status}): ${text.slice(0, 80) || 'Not Found'}. Please ensure your backend is deployed and active on Render.`
      );
    }

    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data.data;
  },

  // Brevo OTP verification
  async sendOtp(email, fullName = '', purpose = 'registration') {
    const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fullName, purpose }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Failed to dispatch verification code');
    return data;
  },

  async verifyOtp(email, otp, purpose = 'registration') {
    const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, purpose }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Invalid or expired verification code');
    return data;
  },

  async resetPassword(email, otp, newPassword) {
    const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Password reset failed');
    return data;
  }
};

// Fallback algorithm run inside browser if backend is not started
function calculateLocalAssessment(scores) {
  const recommendations = careersData
    .map((career) => {
      let earnedScore = 0;
      let maxPossibleScore = 0;

      Object.keys(career.weights || {}).forEach((weightKey) => {
        const userScore = scores[weightKey] !== undefined ? scores[weightKey] : 5;
        const weight = career.weights[weightKey];
        earnedScore += userScore * weight;
        maxPossibleScore += 10 * weight;
      });

      const matchPercentage =
        maxPossibleScore > 0 ? Math.round((earnedScore / maxPossibleScore) * 100) : 0;

      return {
        ...career,
        matchScore: matchPercentage,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);

  const entries = Object.entries(scores);
  const averageScore =
    entries.length > 0
      ? Number((entries.reduce((sum, [, val]) => sum + Number(val), 0) / entries.length).toFixed(1))
      : 5;

  let dominantTrait = 'Balanced';
  if (entries.length > 0) {
    dominantTrait = entries.reduce(
      (max, current) => (current[1] > max[1] ? current : max),
      entries[0]
    )[0];
  }

  return {
    success: true,
    data: {
      topCareers: recommendations,
      dominantTrait,
      averageScore,
      completedAt: new Date().toISOString(),
    }
  };
}
