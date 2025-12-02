const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { ensureAuth } = require('../middleware/authenticate');

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getSingle);

router.post('/', ensureAuth, reviewController.createReview);
router.put('/:id', ensureAuth, reviewController.updateReview);
router.delete('/:id', ensureAuth, reviewController.deleteReview);

module.exports = router;
// This is how the code should look next week when we implement authentication.

// router.get('/', reviewController.getAll);
// router.get('/:id', reviewController.getSingle);

// router.post('/', reviewController.createReview);
// router.put('/:id', reviewController.updateReview);
// router.delete('/:id', reviewController.deleteReview);

// module.exports = router;