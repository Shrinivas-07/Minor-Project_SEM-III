const defaultCareers = require('../data/defaultCareers');
const supabase = require('../config/supabase');

// Calculate career recommendations based on 18 trait sliders (1-10)
exports.calculateAssessment = async (req, res) => {
  try {
    const { scores, userId } = req.body;

    if (!scores || typeof scores !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid scores format. Please provide trait scores object.',
      });
    }

    // Weighted scoring algorithm
    const recommendations = defaultCareers
      .map((career) => {
        let earnedScore = 0;
        let maxPossibleScore = 0;

        Object.keys(career.weights).forEach((weightKey) => {
          const userScore = scores[weightKey] !== undefined ? scores[weightKey] : 5;
          const weight = career.weights[weightKey];
          earnedScore += userScore * weight;
          maxPossibleScore += 10 * weight; // Maximum score if user rated 10
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
      .slice(0, 10); // Top 10 career recommendations

    // Calculate dominant trait and average score
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

    const assessmentResult = {
      topCareers: recommendations,
      dominantTrait,
      averageScore,
      completedAt: new Date().toISOString(),
    };

    // Save to Supabase if Supabase is connected & userId exists
    if (supabase && userId) {
      try {
        await supabase.from('quiz_assessments').insert({
          user_id: userId,
          trait_scores: scores,
          top_careers: recommendations,
          dominant_trait: dominantTrait,
          average_score: averageScore,
        });
      } catch (dbErr) {
        console.warn('Could not persist assessment to Supabase:', dbErr.message);
      }
    }

    res.json({
      success: true,
      data: assessmentResult,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get past assessments for a user
exports.getUserAssessments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!supabase) {
      return res.json({ success: true, data: [] });
    }

    const { data, error } = await supabase
      .from('quiz_assessments')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

