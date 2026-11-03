/**
 * Structured HTTP Request Logger Middleware
 * Provides low-overhead request telemetry with timing and status codes.
 */

function requestLogger(req, res, next) {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(1);
    const status = res.statusCode;
    const color = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
    const reset = '\x1b[0m';

    // Skip verbose logs for health checks in production
    if (req.originalUrl === '/api/health' && process.env.NODE_ENV === 'production') {
      return;
    }

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${color}${status}${reset} (${durationMs}ms)`
    );
  });

  next();
}

module.exports = requestLogger;

