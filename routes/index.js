const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => { 
//     res.send('Hello World');
// });

router.use('/categories', require('./categories'));
router.use('/movies', require('./movies'));



router.get('/login',
    passport.authenticate('github', { scope: ['user:email'] })
);

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