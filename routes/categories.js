const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
// const { ensureAuth } = require('../middleware/authenticate');

// router.get('/', categoryController.getAll);
// router.get('/:id', categoryController.getSingle);

// router.post('/', ensureAuth, categoryController.createCategory);
// router.put('/:id', ensureAuth, categoryController.updateCategory);
// router.delete('/:id', ensureAuth, categoryController.deleteCategory);

// module.exports = router; 
// This is how the code should look next week when we implement authentication.

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getSingle);

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;