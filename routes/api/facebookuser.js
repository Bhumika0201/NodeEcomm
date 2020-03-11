const fbKeys = require("../../config/config");
var passport = require('passport');
const express = require("express");
var Strategy = require('passport-facebook').Strategy;
// Load User model
const User = require("../../models/User");

const router = express.Router();
passport.use(new Strategy({
    clientID: fbKeys.facebook_client_id,
    clientSecret: fbKeys.facebook_api_secret,
    callbackURL: fbKeys.callback_url,
  },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile.id)
      console.log(accessToken)
  
      return cb(null, profile);
    }));
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  // Create a new Express application.
 
  var app = express();
  
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
 

  router.get('/login/facebook',
    passport.authenticate('facebook'),
    function (req, res) {
      console.log(req.user)
    }); 
  

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      
      console.log(req.user);
      return res.json(req.user);
      //res.json('profile', { user: req.user });
      passport.unuse()
  
    });

    router.get("/login", (req, res) => {
  console.log('hi in trial')
    });
  
  
    module.exports = router;