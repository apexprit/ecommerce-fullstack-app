const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { validateAuth, validateLogin } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validateAuth, authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, authController.login);

// @route   GET /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    authController.googleCallback
);

// @route   GET /api/auth/facebook
// @desc    Facebook OAuth login
// @access  Public
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

// @route   GET /api/auth/facebook/callback
// @desc    Facebook OAuth callback
// @access  Public
router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    authController.facebookCallback
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authController.getMe);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authController.logout);

module.exports = router;