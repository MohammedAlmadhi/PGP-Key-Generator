const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Key = require('../models/Key');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
};

// Check authentication status
router.get('/check-authentication', (req, res) => {
    res.json({ authenticated: req.isAuthenticated() });
});

// Login user view
router.get('/login', (req, res) => {
    res.render('user/login', {
        error: req.flash('error')
    });
});

// Login post request
router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        failureFlash: true
    })
);

// Sign up form
router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash('error')
    });
});

// Sign up post request
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
    })
);

// Profile
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const keys = await Key.find({ userId: req.user._id });
        res.render('user/profile', {
            user: req.user,
            keys: keys,
            success: req.flash('success')
        });
    } catch (error) {
        console.error('Error fetching keys:', error);
        req.flash('error', 'Failed to fetch keys');
        res.redirect('/user/login');
    }
});

// Logout user
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/user/login');
    });
});

module.exports = router;
