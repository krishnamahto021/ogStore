const passport = require("passport");
const User = require("../models/userSchema");

const dotenv = require("dotenv").config();
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
      const user = await User.findById(jwtPayload._id).select("-password");
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log(`Error in authentication via jwt ${error}`);
      return done(error);
    }
  })
);
