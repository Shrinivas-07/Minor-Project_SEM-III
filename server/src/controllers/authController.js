/**
 * Auth Controller
 * Handles registration, login, Brevo OTP dispatch, verification, and password reset.
 */

const authService = require('../services/authService');
const otpService = require('./../services/otpService');
const ApiResponse = require('../utils/responseHandler');

exports.register = async (req, res, next) => {
  try {
    const { email, password, fullName, stream, educationLevel, college, targetYear, bio, otp } = req.body;

    // If OTP was provided, verify it first
    if (otp) {
      otpService.verifyOtp(email, otp, 'registration');
    }

    const result = await authService.register({
      email,
      password,
      fullName,
      stream,
      educationLevel,
      college,
      targetYear,
      bio,
    });

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

exports.sendOtp = async (req, res, next) => {
  try {
    const { email, fullName, purpose = 'registration' } = req.body;
    const result = await otpService.generateAndSendOtp({ email, fullName, purpose });
    return ApiResponse.success(res, result, result.message);
  } catch (error) {
    return ApiResponse.badRequest(res, error.message);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp, purpose = 'registration' } = req.body;
    otpService.verifyOtp(email, otp, purpose);
    return ApiResponse.success(res, { verified: true }, 'Verification code confirmed successfully');
  } catch (error) {
    return ApiResponse.badRequest(res, error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await authService.resetPassword({ email, otp, newPassword });
    return ApiResponse.success(res, result, result.message);
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
