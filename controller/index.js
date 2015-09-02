/**
 * controller for all root routes
 */

exports.index = function(req, res, next){
	res.render('index')
};

exports.signup = function(req, res, next){
	res.render('signup')
};

exports.login = function(req, res, next){
	res.render('login')
};