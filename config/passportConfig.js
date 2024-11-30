// config/passportConfig.js
const passport = require('passport');
const { Strategy: oauth2Strategy } = require('passport-google-oauth2');
const  userModel  = require('../models/userSchema.js');
GOOGLE_CLIENT_ID="1036258006429-p744hl3lki6efg40tmd1vasjhb7jr1as.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"


passport.use(
    new oauth2Strategy({
        clientID:GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:6006/auth/google/callback',
        scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email=profile.emails[0].value
            const username=email.split('@')[0]
            let user = await userModel.findOne({ googleId: profile.id });
            if (!user) {
                user = new userModel({
                  
                    fullname: profile.displayName,
                    username:username,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                });
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
