const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sync-profile', userController.syncProfile);
router.get('/profile/:userId', userController.getProfile);
router.post('/save-career', userController.toggleSaveCareer);
router.get('/saved-careers/:userId', userController.getSavedCareers);

module.exports = router;
