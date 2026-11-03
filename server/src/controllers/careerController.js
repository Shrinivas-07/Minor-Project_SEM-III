/**
 * Career Controller
 */

const careerService = require('../services/careerService');
const ApiResponse = require('../utils/responseHandler');

exports.getCareers = async (req, res, next) => {
  try {
    const { category, search, limit = 50, page = 1 } = req.query;

    const result = await careerService.getCareers({
      category,
      search,
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
    });

    return ApiResponse.success(res, result.careers, 'Careers retrieved successfully', 200, {
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await careerService.getCategories();
    return ApiResponse.success(res, categories, 'Categories retrieved successfully');
  } catch (error) {
    next(error);
  }
};

exports.getCareerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const career = await careerService.getCareerById(id);

    if (!career) {
      return ApiResponse.notFound(res, `Career profile '${id}' not found.`);
    }

    return ApiResponse.success(res, career, 'Career profile retrieved');
  } catch (error) {
    next(error);
  }
};
