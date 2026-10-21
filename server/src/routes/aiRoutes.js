const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/chat', aiController.chatWithMentor);
router.get('/suggestions', aiController.getSuggestedQuestions);

module.exports = router;
