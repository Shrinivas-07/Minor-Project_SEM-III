/**
 * Centralized Global Error Handler Middleware
 */

const ApiResponse = require('../utils/responseHandler');

function errorHandler(err, req, res, next) {
  // Prevent double responses if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  console.error(`❌ [Error ${statusCode}] on ${req.method} ${req.originalUrl}:`, err.message);
  if (!isProduction && err.stack) {
    console.error(err.stack);
  }

  const responsePayload = {
    code: err.code || 'INTERNAL_SERVER_ERROR',
    details: !isProduction ? err.stack : undefined,
  };

  return ApiResponse.error(
    res,
    err.message || 'An unexpected server error occurred',
    statusCode,
    responsePayload
  );
}

module.exports = errorHandler;

