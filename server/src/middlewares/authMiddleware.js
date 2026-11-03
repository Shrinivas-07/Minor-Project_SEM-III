/**
 * Supabase JWT Authentication & Context Middleware
 * Verifies Bearer tokens using Supabase Auth and populates req.user
 */

const supabase = require('../config/supabase');
const ApiResponse = require('../utils/responseHandler');

/**
 * Extracts Bearer token from Authorization header
 */
function extractToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

/**
 * Middleware: Optional Authentication
 * Decodes user token if provided; proceeds without error if unauthenticated
 */
async function optionalAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token || !supabase) {
      req.user = null;
      return next();
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      req.user = user;
    } else {
      req.user = null;
    }
  } catch (err) {
    req.user = null;
  }
  next();
}

/**
 * Middleware: Enforces Authentication
 * Returns 401 Unauthorized if token is missing or invalid
 */
async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return ApiResponse.unauthorized(res, 'Authentication token required (Bearer <token>)');
    }

    if (!supabase) {
      return ApiResponse.error(res, 'Database authentication service is currently unavailable', 503);
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return ApiResponse.unauthorized(res, 'Invalid or expired session. Please log in again.');
    }

    req.user = user;
    next();
  } catch (err) {
    return ApiResponse.unauthorized(res, 'Authentication verification failed: ' + err.message);
  }
}

module.exports = {
  optionalAuth,
  requireAuth,
  extractToken,
};

