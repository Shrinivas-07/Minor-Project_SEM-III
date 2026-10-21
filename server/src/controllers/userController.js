const supabase = require('../config/supabase');

// Upsert / sync user profile
exports.syncProfile = async (req, res) => {
  try {
    const { userId, email, fullName, stream, educationLevel, bio, targetYear } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }

    if (!supabase) {
      return res.json({
        success: true,
        message: 'Profile stored in local session (Supabase not configured)',
        data: { userId, email, fullName, stream, educationLevel, bio, targetYear }
      });
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email,
        full_name: fullName,
        stream,
        education_level: educationLevel,
        bio,
        target_year: targetYear,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!supabase) {
      return res.json({ success: true, data: null });
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bookmark / save a career
exports.toggleSaveCareer = async (req, res) => {
  try {
    const { userId, careerId, careerName, category, matchScore, notes } = req.body;

    if (!userId || !careerId) {
      return res.status(400).json({ success: false, message: 'userId and careerId required' });
    }

    if (!supabase) {
      return res.json({ success: true, message: 'Bookmark handled locally' });
    }

    // Check if already saved
    const { data: existing } = await supabase
      .from('saved_careers')
      .select('id')
      .eq('user_id', userId)
      .eq('career_id', careerId)
      .maybeSingle();

    if (existing) {
      // Remove bookmark
      await supabase.from('saved_careers').delete().eq('id', existing.id);
      return res.json({ success: true, action: 'removed', careerId });
    } else {
      // Add bookmark
      const { data, error } = await supabase
        .from('saved_careers')
        .insert({
          user_id: userId,
          career_id: careerId,
          career_name: careerName,
          category,
          match_score: matchScore,
          notes: notes || ''
        })
        .select()
        .single();

      if (error) throw error;
      return res.json({ success: true, action: 'saved', data });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user saved careers
exports.getSavedCareers = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!supabase) {
      return res.json({ success: true, data: [] });
    }

    const { data, error } = await supabase
      .from('saved_careers')
      .select('*')
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
