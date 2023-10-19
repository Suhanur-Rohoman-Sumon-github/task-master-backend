const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
require("dotenv").config();
const User = require("../models/userModel");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.json_key;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.id });
        
        if (!user) {
            return done(null, false);
        }
        
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));
