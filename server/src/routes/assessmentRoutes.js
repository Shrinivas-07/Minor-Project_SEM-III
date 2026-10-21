const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/calculate', assessmentController.calculateAssessment);
router.get('/history/:userId', assessmentController.getUserAssessments);

module.exports = router;
