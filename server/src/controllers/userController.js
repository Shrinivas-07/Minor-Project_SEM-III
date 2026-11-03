/**
 * User Controller
 */

const userService = require('../services/userService');
const ApiResponse = require('../utils/responseHandler');

exports.syncProfile = async (req, res, next) => {
  try {
    const { userId, email, fullName, stream, educationLevel, bio, targetYear, avatarUrl } = req.body;
    const effectiveUserId = req.user?.id || userId;

    if (!effectiveUserId) {
      return ApiResponse.badRequest(res, 'userId is required');
    }

    const data = await userService.syncProfile({
      userId: effectiveUserId,
      email: req.user?.email || email,
      fullName,
      stream,
      educationLevel,
      bio,
      targetYear,
      avatarUrl,
    });

    return ApiResponse.success(res, data, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const profile = await userService.getProfile(userId);
    return ApiResponse.success(res, profile, 'Profile retrieved');
  } catch (error) {
    next(error);
  }
};

exports.toggleSaveCareer = async (req, res, next) => {
  try {
    const { userId, careerId, careerName, category, matchScore, notes } = req.body;
    const effectiveUserId = req.user?.id || userId;

    if (!effectiveUserId || !careerId) {
      return ApiResponse.badRequest(res, 'userId and careerId are required');
    }

    const result = await userService.toggleSaveCareer({
      userId: effectiveUserId,
      careerId,
      careerName,
      category,
      matchScore,
      notes,
    });

    return ApiResponse.success(res, result, `Career bookmark ${result.action}`);
  } catch (error) {
    next(error);
  }
};

exports.getSavedCareers = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const bookmarks = await userService.getSavedCareers(userId);
    return ApiResponse.success(res, bookmarks, 'Saved careers retrieved');
  } catch (error) {
    next(error);
  }
};
