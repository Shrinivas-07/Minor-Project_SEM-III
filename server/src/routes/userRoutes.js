/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { optionalAuth } = require('../middlewares/authMiddleware');

router.post('/sync-profile', optionalAuth, userController.syncProfile);
router.get('/profile/:userId', optionalAuth, userController.getProfile);
router.post('/save-career', optionalAuth, userController.toggleSaveCareer);
router.get('/saved-careers/:userId', optionalAuth, userController.getSavedCareers);

module.exports = router;
