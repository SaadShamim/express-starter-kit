var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var models = require("./models");

models.sequelize.sync({ force: true })

app.use(cookieParser()); 
app.use(session({
	secret: 'derp',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); 

require('./routes')(app,passport);
var port = process.env.PORT || 3000;

var server = app.listen(port);
console.log('listening on port ' + port);

/*
todo: require from root
 */