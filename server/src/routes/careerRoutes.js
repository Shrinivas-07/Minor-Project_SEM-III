const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

router.get('/', careerController.getCareers);
router.get('/categories', careerController.getCategories);
router.get('/:id', careerController.getCareerById);

module.exports = router;

