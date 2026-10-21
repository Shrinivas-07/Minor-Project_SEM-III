const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_KEY } = require('./env');

let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('✅ Supabase client initialized successfully.');
  } catch (error) {
    console.warn('⚠️ Supabase client initialization error:', error.message);
  }
} else {
  console.warn('ℹ️ SUPABASE_URL or SUPABASE_KEY not provided. Database sync features will run in local/fallback mode.');
}

module.exports = supabase;
