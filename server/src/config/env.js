const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || '*',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  SUPABASE_URL: (
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  ).trim(),
  SUPABASE_KEY: (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_KEY ||
    ''
  ).trim(),
  BREVO_API_KEY: (process.env.BREVO_API_KEY || '').trim(),
  BREVO_SENDER_EMAIL: (process.env.BREVO_SENDER_EMAIL || 'support@clearpath.com').trim(),
  BREVO_SENDER_NAME: (process.env.BREVO_SENDER_NAME || 'ClearPath Security').trim(),
};

