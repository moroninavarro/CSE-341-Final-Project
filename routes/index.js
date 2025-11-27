const express = require('express');
const router = express.Router();
const passport = require('passport');

// API routes
router.use('/categories', require('./categories'));
router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));

// GitHub OAuth Login
router.get('/login',
    passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub OAuth Callback
router.get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/api-docs');
    }
);

// Logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }

        req.session.user = null;

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
});

module.exports = router;
