/**
 * Auth Controller
 */

const authService = require('../services/authService');
const ApiResponse = require('../utils/responseHandler');

exports.register = async (req, res, next) => {
  try {
    const { email, password, fullName, stream, educationLevel } = req.body;
    const result = await authService.register({ email, password, fullName, stream, educationLevel });
    return ApiResponse.created(res, result, result.message);
  } catch (error) {
    return ApiResponse.badRequest(res, error.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return ApiResponse.success(res, result, 'Login successful');
  } catch (error) {
    return ApiResponse.badRequest(res, error.message);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const result = await authService.getMe(req.user);
    return ApiResponse.success(res, result, 'User session verified');
  } catch (error) {
    next(error);
  }
};

