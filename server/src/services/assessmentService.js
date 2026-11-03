/**
 * Assessment Scoring & Career Matching Service
 */

const defaultCareers = require('../data/defaultCareers');
const supabase = require('../config/supabase');
const { isValidUUID, normalizeCareer } = require('../utils/validators');

class AssessmentService {
  /**
   * Calculates career match percentages from user trait scores (1-10 scale)
   */
  calculate(scores, userId = null) {
    if (!scores || typeof scores !== 'object') {
      throw new Error('Valid scores dictionary is required.');
    }

    const normalizedCareers = defaultCareers.map(normalizeCareer);

    // Score each career against weights
    const recommendations = normalizedCareers
      .map((career) => {
        let earnedScore = 0;
        let maxPossibleScore = 0;
        const weights = career.weights || {};

        const weightKeys = Object.keys(weights);

        if (weightKeys.length === 0) {
          return {
            id: career.id,
            name: career.name,
            category: career.category,
            tagline: career.tagline,
            description: career.description,
            averageSalaryInr: career.averageSalaryInr,
            growthRate: career.growthRate,
            skills: career.skills.slice(0, 5),
            matchScore: 65, // Baseline default
          };
        }

        weightKeys.forEach((key) => {
          // Normalize key search (case-insensitive)
          const matchedScoreKey = Object.keys(scores).find(
            (k) => k.toLowerCase() === key.toLowerCase()
          );
          const userValue = matchedScoreKey ? Number(scores[matchedScoreKey]) : 5;
          const weight = Number(weights[key]) || 1;

          earnedScore += userValue * weight;
          maxPossibleScore += 10 * weight;
        });

        const matchPercentage =
          maxPossibleScore > 0 ? Math.min(100, Math.round((earnedScore / maxPossibleScore) * 100)) : 50;

        return {
          id: career.id,
          name: career.name,
          category: career.category,
          tagline: career.tagline,
          description: career.description,
          averageSalaryInr: career.averageSalaryInr,
          averageSalaryUsd: career.averageSalaryUsd,
          growthRate: career.growthRate,
          skills: career.skills.slice(0, 5),
          matchScore: matchPercentage,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 12); // Return top 12 matches

    // Compute dominant trait and mean score
    const entries = Object.entries(scores).filter(([, val]) => typeof val === 'number' || !isNaN(Number(val)));
    const averageScore =
      entries.length > 0
        ? Number((entries.reduce((sum, [, val]) => sum + Number(val), 0) / entries.length).toFixed(1))
        : 5;

    let dominantTrait = 'Strategic & Balanced';
    if (entries.length > 0) {
      dominantTrait = entries.reduce(
        (max, current) => (Number(current[1]) > Number(max[1]) ? current : max),
        entries[0]
      )[0];
    }

    return {
      topCareers: recommendations,
      dominantTrait,
      averageScore,
      completedAt: new Date().toISOString(),
    };
  }

  /**
   * Persists assessment result to Supabase if valid UUID
   */
  async persistResult(result, scores, userId) {
    if (!supabase || !userId || !isValidUUID(userId)) {
      return { persisted: false, reason: 'Local/Demo mode or Supabase disconnected' };
    }

    try {
      const { data, error } = await supabase.from('quiz_assessments').insert({
        user_id: userId,
        trait_scores: scores,
        top_careers: result.topCareers,
        dominant_trait: result.dominantTrait,
        average_score: result.averageScore,
      }).select().single();

      if (error) throw error;
      return { persisted: true, id: data.id };
    } catch (err) {
      console.warn('⚠️ Assessment database insert notice:', err.message);
      return { persisted: false, error: err.message };
    }
  }

  /**
   * Retrieve historical assessments for a user
   */
  async getUserHistory(userId) {
    if (!supabase || !userId || !isValidUUID(userId)) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('quiz_assessments')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('⚠️ Could not fetch user assessments:', err.message);
      return [];
    }
  }
}

module.exports = new AssessmentService();

