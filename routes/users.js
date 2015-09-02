var express = require('express');
var users = require('../controller/users');
var router = express.Router();

//should be a post
router.get('/create', users.create);

router.get('/', users.findAll);
router.get('/createProfile', users.createProfileForm);
router.post('/createProfile', users.createProfile);

router.get('/:_id', users.findById);

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;