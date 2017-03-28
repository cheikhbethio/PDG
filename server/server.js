'use strict';
//module js
var application_root = __dirname,
		path = require('path'),
		express = require('express'),
		mongoose = require('mongoose'),
		favicon = require('serve-favicon'),
		morgan = require('morgan'),
		methodOverride = require('method-override'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		flash = require('connect-flash'),
		cookieParser = require('cookie-parser'),
		passport = require('passport'),
		app = express();

//db Connection
var configDB = require('./config/database.js');
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);

// on recup les variables
var mayVar = require("./config/variables");

//starting server port
var port = process.env.PORT || 8000;
app.use(express.static(path.join(application_root, '../client')));

app.set('trust proxy', 1) // trust first proxy
require('./config/passport.js')(passport);
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
	secret: 'seugneBethiodieuredieufway',
	resave: true,
	saveUninitialized: true,
	expires: new Date(Date.now() + mayVar.session.session_duration),
	cookie: {maxAge: mayVar.session.session_duration}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function manageSession(req, res, next) {
	var session_age = req.session.cookie.expires;
	if (session_age < new Date(Date.now())) {
		req.logout();
		req.session.destroy();
	}
	return next();
});

app.use(bodyParser.urlencoded({extended: true}));

/********************************* routes**********************************/

app.listen(port, function () {
	console.log("node server on port : " + port);
	console.log("application_root : " + application_root);
});

require('./route/user.js')(app);
require('./route/connection.js')(app, passport);
require('./route/poeme.js')(app);
require('./route/comment.js')(app);
require('./route/test.js')(app);
