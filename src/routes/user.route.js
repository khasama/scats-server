const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { verifyTokenManager } = require('../middlewares');

router.put('/change-role/:id', verifyTokenManager(1), UserController.changeRole);
router.get('/:id', verifyTokenManager(2), UserController.getUser);
router.get('/', verifyTokenManager(2), UserController.getAll);
// router.delete('/delete/:id', UserController.deleteOne);

module.exports = router;