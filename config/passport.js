var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var User = models.User;

module.exports = function(passport) {

    //invoked on auth, decides what we should store in out session
    passport.serializeUser(function(userId, done) {
        console.log("serialize: " + JSON.stringify(userId));
        done(null, userId);
    });

    //invoked at every request, allows us to get additional info at every requsest
    //accessed by going req.user in express
    passport.deserializeUser(function(userId, done) {
        User.findOne({
            where: {id:userId},
            attributes: ['id'],
        }).done(function(user, err) {
            console.log("deserializeUser: " + JSON.stringify(user));

            //todo:change to user.id
            done(err, user.id);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log();
        // asynchronous
        process.nextTick(function() {

            var pass = User.generateHash(password);

            /*check if email exists before creating */

            var newUser = User.create({
                email: email,
                password: pass
            }).then(function(user) {
                return done(null, user.id);
            }).catch(function(error) {
                console.log(error);
            });

        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        console.log(email);
        User.findOne({
            where: {email:email},
        }).then(function(user) {
            if(User.validPassword(password, user.password)) {
                return done(null, user.id);
            } else {
                return done(null, false);
            }
            console.log("1231231&*^*&(*&*(&(*&")
        }).catch(function(error) {
            console.log("11&*^*&(*&*(&(*&")
            return done(null, false);
        });

    }));

};