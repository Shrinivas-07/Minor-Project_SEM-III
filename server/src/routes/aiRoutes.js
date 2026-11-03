/**
 * AI Advisory Routes
 */

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { optionalAuth } = require('../middlewares/authMiddleware');

router.post('/chat', optionalAuth, aiController.chatWithMentor);
router.get('/suggested-questions', aiController.getSuggestedQuestions);

module.exports = router;
