var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var JwtStrategy = require('passport-jwt').Strategy;//provide strategy for configuring token
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var FacebookTokenStrategy = require('passport-facebook-token');


var config = require('./config.js');



//to store local strategy
exports.local =passport.use(new LocalStrategy(User.authenticate()));
//take care or support for session in password
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create token
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};//options on how JWT should be extracted
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;


//JWT based strategy which takes options and verify functions
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

//to verify incoming user where we are not using sessions
exports.verifyUser = passport.authenticate('jwt', {session: false});
exports.verifyAdmin = function(req,res,next){
    if(req.user.admin)
    {
        next();
        return;
    }
    else
    {   var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};

//facebook token strategy 
exports.facebookPassport = passport.use(new 
FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        //there is an error
        if (err) {
            return done(err, false);
        }
        //user has already logged in 
        if (!err && user !== null) {
            return done(null, user);
        }
        //user dosent exit: create new user
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));