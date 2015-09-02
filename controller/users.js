var models = require('../models');
var User = models.User;
var Profile = models.Profile;

exports.create = function(req, res, next) {
    var newUser = User.create({
        email: "a",
        password: "a",
    }).then(function(user) {
    	res.json(user);
    }).catch(function(error) {
    	res.json(error);
    });
};

exports.createProfileForm = function(req, res, next) {
    res.render('createProfile');
};

exports.createProfile = function(req, res, next) {
    console.log("create profile: " + req.user)
    var profile = Profile.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        userId: req.user,
    }).then(function(user) {
        res.json(user);
    }).catch(function(error) {
        res.json(error);
    }); 
};

exports.findAll = function(req, res, next) {
	User.findAll({
		attributes: ['id', 'email']
	}).then(function(user) {
    	res.json(user);
    }).catch(function(error) {
    	res.json(error);
    });
};

/**
 * @param  {Integer} req.id
 * @return {[JSON]}
 */
exports.findById = function(req, res, next) {
	User.findOne({
		where: {id:req.params._id},
		attributes: ['id', 'email'],
	}).then(function(user) {
    	res.json(user);
    }).catch(function(error) {
    	res.json(error);
    });
};