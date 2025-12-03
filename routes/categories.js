const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require('../middleware/validate-categories');


router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getSingle);

router.post('/', isAuthenticated, validation.saveCategory, categoryController.createCategory);
router.put('/:id', isAuthenticated, validation.saveCategory, categoryController.updateCategory);
router.delete('/:id', isAuthenticated, categoryController.deleteCategory);

module.exports = router; 


// router.get('/', categoryController.getAll);
// router.get('/:id', categoryController.getSingle);

// router.post('/', categoryController.createCategory);
// router.put('/:id', categoryController.updateCategory);
// router.delete('/:id', categoryController.deleteCategory);

// module.exports = router;