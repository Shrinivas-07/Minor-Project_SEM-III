/**
 * Assessment Controller
 */

const assessmentService = require('../services/assessmentService');
const ApiResponse = require('../utils/responseHandler');

exports.calculateAssessment = async (req, res, next) => {
  try {
    const { scores, userId } = req.body || {};

    if (!scores || typeof scores !== 'object') {
      return ApiResponse.badRequest(res, 'Trait scores object is required.');
    }

    // 1. Calculate recommendations
    const result = assessmentService.calculate(scores, userId);

    // 2. Persist to DB in background if user is authenticated/present
    const effectiveUserId = req.user?.id || userId;
    if (effectiveUserId) {
      assessmentService.persistResult(result, scores, effectiveUserId).catch(() => {});
    }

    return ApiResponse.success(res, result, 'Assessment scored successfully');
  } catch (error) {
    next(error);
  }
};

exports.getUserAssessments = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const history = await assessmentService.getUserHistory(userId);
    return ApiResponse.success(res, history, 'Assessment history retrieved');
  } catch (error) {
    next(error);
  }
};
