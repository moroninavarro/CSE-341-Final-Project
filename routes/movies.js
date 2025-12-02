const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', movieController.getAll);
router.get('/:id', movieController.getSingle);

router.post('/', isAuthenticated, movieController.createMovie);
router.put('/:id', isAuthenticated, movieController.updateMovie);
router.delete('/:id', isAuthenticated, movieController.deleteMovie);

module.exports = router;
// This is how the code should look next week when we implement authentication.

// router.get('/', movieController.getAll);
// router.get('/:id', movieController.getSingle);

// router.post('/', movieController.createMovie);
// router.put('/:id', movieController.updateMovie);
// router.delete('/:id', movieController.deleteMovie);

// module.exports = router;