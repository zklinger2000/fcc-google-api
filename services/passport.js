const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.appSecret
};

// JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // console.log(payload);
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);
    // If there is a user found, call done with null for 'no errors' and the returned User from db
    if (user) {
      done(null, user);
    } else { // Else call done with null and false for 'no user found'
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
