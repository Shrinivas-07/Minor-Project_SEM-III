/**
 * Career Catalog Service
 * Manages access to the 32+ career dataset with automatic Supabase sync & data normalization.
 */

const defaultCareers = require('../data/defaultCareers');
const supabase = require('../config/supabase');
const { normalizeCareer } = require('../utils/validators');

class CareerService {
  constructor() {
    this.memoryCatalog = defaultCareers.map(normalizeCareer);
    this.isSynced = false;
  }

  /**
   * Initializes or verifies database catalog sync
   */
  async syncCatalogWithDatabase() {
    if (!supabase || this.isSynced) return;

    try {
      // Check current rows in Supabase
      const { data, count, error } = await supabase
        .from('career_catalog')
        .select('id', { count: 'exact' });

      if (!error && (count === 0 || !data || data.length < this.memoryCatalog.length)) {
        console.log(`📦 Syncing ${this.memoryCatalog.length} careers to Supabase career_catalog...`);

        const rowsToUpsert = this.memoryCatalog.map((c) => ({
          id: c.id,
          name: c.name,
          category: c.category,
          description: c.description,
          average_salary_inr: c.averageSalaryInr,
          average_salary_usd: c.averageSalaryUsd,
          growth_rate: c.growthRate,
          skills: c.skills,
          roadmap: c.roadmap,
          resources: [
            ...c.courses.map((course) => ({ title: course.name, type: 'course', url: course.url, provider: course.provider })),
            ...c.knowledge.map((k) => ({ title: k.title, type: 'guide', url: k.url, provider: k.type })),
          ],
          trait_weights: c.weights,
        }));

        const { error: upsertErr } = await supabase.from('career_catalog').upsert(rowsToUpsert, { onConflict: 'id' });
        if (upsertErr) {
          console.warn('⚠️ Career catalog sync notice:', upsertErr.message);
        } else {
          console.log('✅ Supabase career_catalog successfully synced with 32+ careers.');
        }
      }

      this.isSynced = true;
    } catch (err) {
      console.warn('⚠️ Could not complete catalog sync (will serve memory catalog):', err.message);
    }
  }

  /**
   * Get all careers with search, filter, and pagination
   */
  async getCareers({ category, search, limit = 50, page = 1 }) {
    let list = this.memoryCatalog;

    // If Supabase is available and has custom records, read from DB
    if (supabase) {
      try {
        const { data, error } = await supabase.from('career_catalog').select('*');
        if (!error && data && data.length >= this.memoryCatalog.length) {
          list = data.map(normalizeCareer);
        }
      } catch (err) {
        // Fall back to memory catalog
      }
    }

    let filtered = [...list];

    // Filter by category
    if (category && category !== 'All') {
      const catLower = category.toLowerCase().trim();
      filtered = filtered.filter((c) => c.category && c.category.toLowerCase() === catLower);
    }

    // Filter by search query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)) ||
          c.category.toLowerCase().includes(q)
      );
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      careers: paginated,
      total,
      page,
      limit,
    };
  }

  /**
   * Get distinct categories
   */
  async getCategories() {
    const categories = Array.from(new Set(this.memoryCatalog.map((c) => c.category)));
    return ['All', ...categories];
  }

  /**
   * Get single career by ID
   */
  async getCareerById(id) {
    if (!id) return null;

    // Check memory first
    const found = this.memoryCatalog.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (found) return found;

    // Check database
    if (supabase) {
      try {
        const { data, error } = await supabase.from('career_catalog').select('*').eq('id', id).single();
        if (!error && data) {
          return normalizeCareer(data);
        }
      } catch (err) {
        // Ignore
      }
    }

    return null;
  }
}

const careerService = new CareerService();
// Trigger background sync
careerService.syncCatalogWithDatabase().catch(() => {});

module.exports = careerService;

