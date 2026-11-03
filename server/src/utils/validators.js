/**
 * Input Validation & Data Normalization Utilities
 */

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidUUID(val) {
  if (!val || typeof val !== 'string') return false;
  return UUID_REGEX.test(val);
}

function isValidEmail(val) {
  if (!val || typeof val !== 'string') return false;
  return EMAIL_REGEX.test(val.trim());
}

/**
 * Normalizes a career object whether it comes from:
 * 1. Default local JS data (camelCase)
 * 2. Supabase / Postgres table (snake_case)
 * Guarantees that camelCase properties exist so frontend React components never crash.
 */
function normalizeCareer(raw) {
  if (!raw || typeof raw !== 'object') return null;

  return {
    id: raw.id,
    name: raw.name,
    category: raw.category,
    icon: raw.icon || 'Compass',
    tagline: raw.tagline || raw.description?.slice(0, 80) || '',
    description: raw.description || '',
    averageSalaryInr: raw.averageSalaryInr || raw.average_salary_inr || '₹8 - ₹25 LPA',
    averageSalaryUsd: raw.averageSalaryUsd || raw.average_salary_usd || '$75,000 - $160,000',
    growthRate: raw.growthRate || raw.growth_rate || '18% (Growing)',
    topEmployers: raw.topEmployers || raw.top_employers || [],
    skills: raw.skills || [],
    roadmap: raw.roadmap || [],
    youtubeSearchQuery: raw.youtubeSearchQuery || raw.youtube_search_query || `${raw.name} roadmap course tutorial`,
    featuredVideos: raw.featuredVideos || raw.featured_videos || [],
    courses: raw.courses || [],
    knowledge: raw.knowledge || [],
    weights: raw.weights || raw.trait_weights || {},
  };
}

module.exports = {
  isValidUUID,
  isValidEmail,
  normalizeCareer,
};

