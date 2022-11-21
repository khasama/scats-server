const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { verifyTokenManager } = require('../middlewares');

router.post('/login-admin', AuthController.loginAdminSite);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.post('/register', AuthController.register);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;