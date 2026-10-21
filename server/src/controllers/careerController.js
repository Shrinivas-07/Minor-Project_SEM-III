const defaultCareers = require('../data/defaultCareers');
const supabase = require('../config/supabase');

// Get all careers with optional search & filter
exports.getCareers = async (req, res) => {
  try {
    const { category, search, limit } = req.query;

    // Check if Supabase has custom careers
    let careers = defaultCareers;
    if (supabase) {
      try {
        const { data, error } = await supabase.from('career_catalog').select('*');
        if (!error && data && data.length > 0) {
          careers = data;
        }
      } catch (err) {
        // Fall back to defaultCareers silently
      }
    }

    let filtered = [...careers];

    if (category && category !== 'All') {
      filtered = filtered.filter(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (limit) {
      filtered = filtered.slice(0, parseInt(limit, 10));
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single career by ID
exports.getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    let career = defaultCareers.find((c) => c.id === id);

    if (!career && supabase) {
      const { data } = await supabase
        .from('career_catalog')
        .select('*')
        .eq('id', id)
        .single();
      career = data;
    }

    if (!career) {
      return res.status(404).json({ success: false, message: 'Career not found' });
    }

    res.json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get list of unique categories
exports.getCategories = (req, res) => {
  const categories = Array.from(new Set(defaultCareers.map((c) => c.category)));
  res.json({ success: true, data: ['All', ...categories] });
};

