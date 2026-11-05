/**
 * User Profile & Bookmark Service
 */

const supabase = require('../config/supabase');
const { isValidUUID } = require('../utils/validators');

class UserService {
  /**
   * Upsert or update a user profile
   */
  async syncProfile({ userId, email, fullName, stream, educationLevel, bio, targetYear, avatarUrl, college, location, phone, username }) {
    if (!userId) {
      throw new Error('userId is required to sync profile.');
    }

    if (!supabase || !isValidUUID(userId)) {
      return {
        id: userId,
        email,
        full_name: fullName,
        stream,
        education_level: educationLevel,
        bio,
        target_year: targetYear,
        avatar_url: avatarUrl,
        college,
        location,
        phone,
        username,
        isLocal: true,
      };
    }

    const payload = {
      id: userId,
      email,
      updated_at: new Date().toISOString(),
    };

    if (fullName !== undefined) payload.full_name = fullName;
    if (stream !== undefined) payload.stream = stream;
    if (educationLevel !== undefined) payload.education_level = educationLevel;
    if (bio !== undefined) payload.bio = bio;
    if (targetYear !== undefined) payload.target_year = targetYear;
    if (avatarUrl !== undefined) payload.avatar_url = avatarUrl;
    if (college !== undefined) payload.college = college;
    if (location !== undefined) payload.location = location;
    if (phone !== undefined) payload.phone = phone;
    if (username !== undefined) payload.username = username;

    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get user profile by userId
   */
  async getProfile(userId) {
    if (!userId) return null;

    if (!supabase || !isValidUUID(userId)) {
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Toggle save/bookmark career
   */
  async toggleSaveCareer({ userId, careerId, careerName, category, matchScore = 0, notes = '' }) {
    if (!userId || !careerId) {
      throw new Error('userId and careerId are required.');
    }

    if (!supabase || !isValidUUID(userId)) {
      return { action: 'local_saved', careerId };
    }

    // Check if already bookmarked
    const { data: existing } = await supabase
      .from('saved_careers')
      .select('id')
      .eq('user_id', userId)
      .eq('career_id', careerId)
      .maybeSingle();

    if (existing) {
      await supabase.from('saved_careers').delete().eq('id', existing.id);
      return { action: 'removed', careerId };
    }

    const { data, error } = await supabase.from('saved_careers').insert({
      user_id: userId,
      career_id: careerId,
      career_name: careerName || careerId,
      category: category || 'General',
      match_score: matchScore,
      notes,
    }).select().single();

    if (error) throw error;
    return { action: 'saved', careerId, bookmark: data };
  }

  /**
   * Get all bookmarks for a user
   */
  async getSavedCareers(userId) {
    if (!userId || !supabase || !isValidUUID(userId)) {
      return [];
    }

    const { data, error } = await supabase
      .from('saved_careers')
      .select('*')
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

module.exports = new UserService();

