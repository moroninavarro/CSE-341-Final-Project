const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require('../middleware/validate-user');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

router.post('/', isAuthenticated, validation.saveUsers, userController.createUser);
router.put('/:id', isAuthenticated, validation.saveUsers, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
// This is how the code should look next week when we implement authentication.

// router.get('/', userController.getAll);
// router.get('/:id', userController.getSingle);
// router.post('/', userController.createUser);

// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// module.exports = router;