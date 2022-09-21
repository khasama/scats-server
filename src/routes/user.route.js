const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares');

router.post('/login-admin', UserController.loginAdminSite);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.post('/register', UserController.register);
router.put('/change-role/:id', verifyToken(1), UserController.changeRole);

router.get('/:id', verifyToken(2), UserController.getUser);
router.get('/', verifyToken(2), UserController.getAll);
// router.delete('/delete/:id', UserController.deleteOne);

module.exports = router;