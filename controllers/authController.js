// controllers/authController.js
const passport = require('passport');

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleAuthCallback = passport.authenticate('google', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/signin',
});

const loginSuccess = (req, res) => {
    if (req.user) {
        res.status(200).json({ msg: 'User login successful', user: req.user });
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    }
};

module.exports = { googleAuth, googleAuthCallback, loginSuccess };
