const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Serialize and deserialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Local signup strategy
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const { username, confirm_password } = req.body;

    if (!username || !email || !password || !confirm_password) {
        return done(null, false, req.flash('error', 'All fields are required'));
    }

    if (password !== confirm_password) {
        return done(null, false, req.flash('error', 'Passwords do not match'));
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return done(null, false, req.flash('error', 'Email already used'));
            }
            if (existingUser.username === username) {
                return done(null, false, req.flash('error', 'Username already used'));
            }
        }

        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = newUser.hashPassword(password);

        const savedUser = await newUser.save();
        return done(null, savedUser, req.flash('success', 'User Added'));

    } catch (err) {
        return done(err);
    }
}));

// Local login strategy
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, req.flash('error', 'User not found'));
        }
        if (!user.comparePasswords(password, user.password)) {
            return done(null, false, req.flash('error', 'Password is incorrect'));
        }
        return done(null, user, req.flash('success', 'Welcome back'));
    } catch (err) {
        return done(err, false, req.flash('error', 'Something wrong happened'));
    }
}));

module.exports = passport;

module.exports = passport;
