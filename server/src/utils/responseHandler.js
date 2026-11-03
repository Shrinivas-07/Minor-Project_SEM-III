/**
 * Standardized API Response Utilities
 * Ensures consistent response contracts across all endpoints:
 * Success: { success: true, message, data, meta }
 * Error:   { success: false, message, error: { code, details } }
 */

class ApiResponse {
  static success(res, data = null, message = 'Success', statusCode = 200, meta = null) {
    const payload = {
      success: true,
      message,
      data,
    };

    if (meta) {
      payload.meta = meta;
    }

    return res.status(statusCode).json(payload);
  }

  static created(res, data = null, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, error = null) {
    const payload = {
      success: false,
      message,
    };

    if (error) {
      payload.error = typeof error === 'string' ? { message: error } : error;
    }

    return res.status(statusCode).json(payload);
  }

  static badRequest(res, message = 'Bad Request', details = null) {
    return this.error(res, message, 400, details);
  }

  static unauthorized(res, message = 'Unauthorized access') {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = 'Forbidden') {
    return this.error(res, message, 403);
  }

  static notFound(res, message = 'Resource not found') {
    return this.error(res, message, 404);
  }
}

module.exports = ApiResponse;

