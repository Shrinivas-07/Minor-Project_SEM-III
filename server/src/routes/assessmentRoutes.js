/**
 * Assessment Routes
 */

const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { optionalAuth } = require('../middlewares/authMiddleware');

router.post('/calculate', optionalAuth, assessmentController.calculateAssessment);
router.get('/history/:userId', optionalAuth, assessmentController.getUserAssessments);

module.exports = router;
