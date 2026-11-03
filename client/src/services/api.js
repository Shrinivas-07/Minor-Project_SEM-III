import { careersData } from '../data/careersData';
import { resourcesData } from '../data/resourcesData';
import { supabase } from './supabase';

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  ''
).replace(/\/$/, ''); // Strip trailing slash

/**
 * Helper to build JSON headers with optional Supabase Bearer token
 */
async function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
    } catch (e) {
      // Ignore
    }
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
      if (!res.ok) throw new Error('AI mentor error');
      return await res.json();
    } catch (err) {
      return {
        success: true,
        data: {
          reply: `Here are key insights for your inquiry: Focusing on foundational skills, building hands-on portfolio case studies, and preparing for industry certifications will fast-track your success. (Connect backend with your GEMINI_API_KEY for dynamic real-time AI responses!)`,
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

  async backendRegister(email, password, fullName) {
    if (!API_BASE) {
      throw new Error(
        'Backend URL is not configured in Vercel. Please add VITE_API_BASE_URL (your Render URL) in Vercel Settings > Environment Variables.'
      );
    }

    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
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
        id: career.id,
        name: career.name,
        category: career.category,
        tagline: career.tagline,
        description: career.description,
        averageSalaryInr: career.averageSalaryInr,
        growthRate: career.growthRate,
        skills: career.skills.slice(0, 5),
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
