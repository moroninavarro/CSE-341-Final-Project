const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { ensureAuth } = require('../middleware/authenticate');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.post('/', userController.createUser);

router.put('/:id', ensureAuth, userController.updateUser);
router.delete('/:id', ensureAuth, userController.deleteUser);

module.exports = router;
// This is how the code should look next week when we implement authentication.

// router.get('/', userController.getAll);
// router.get('/:id', userController.getSingle);
// router.post('/', userController.createUser);

// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// module.exports = router;