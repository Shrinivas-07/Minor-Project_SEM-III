/**
 * AI Advisory Controller
 */

const aiService = require('../services/aiService');
const careerService = require('../services/careerService');
const ApiResponse = require('../utils/responseHandler');

exports.chatWithMentor = async (req, res, next) => {
  try {
    const { message, careerId, userProfile, history = [], userId } = req.body;

    if (!message || !message.trim()) {
      return ApiResponse.badRequest(res, 'Student inquiry message is required.');
    }

    const effectiveUserId = req.user?.id || userId;
    const advice = await aiService.generateAdvice({
      message,
      careerId,
      userProfile,
      history,
      userId: effectiveUserId,
    });

    return ApiResponse.success(res, advice, 'Advisory response generated');
  } catch (error) {
    next(error);
  }
};

exports.getSuggestedQuestions = async (req, res, next) => {
  try {
    const { careerId } = req.query;
    const careerContext = careerId ? await careerService.getCareerById(careerId) : null;
    const suggestions = aiService.getSuggestedPrompts(careerContext);

    return ApiResponse.success(res, suggestions, 'Suggested prompts retrieved');
  } catch (error) {
    next(error);
  }
};
