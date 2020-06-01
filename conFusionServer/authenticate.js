var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');


//to store local strategy
exports.local =passport.use(new LocalStrategy(User.authenticate()));
//take care or support for session in password
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());