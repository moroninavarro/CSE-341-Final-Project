const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require('../middleware/validate-reviews');

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getSingle);

router.post('/', isAuthenticated, validation.saveReviews, reviewController.createReview);
router.put('/:id', isAuthenticated, validation.saveReviews, reviewController.updateReview);
router.delete('/:id', isAuthenticated, reviewController.deleteReview);

module.exports = router;
// This is how the code should look next week when we implement authentication.

// router.get('/', reviewController.getAll);
// router.get('/:id', reviewController.getSingle);

// router.post('/', reviewController.createReview);
// router.put('/:id', reviewController.updateReview);
// router.delete('/:id', reviewController.deleteReview);

// module.exports = router;