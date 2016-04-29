'use strict';
//module js
var application_root=__dirname,
    path        =   require('path'),
    express     =   require('express'),
    mongoose    =   require('mongoose'),
    favicon     =   require('serve-favicon'),
    morgan      =   require('morgan'),
    methodOverride=  require('method-override'),
    bodyParser  =   require('body-parser'),
    session     =   require('express-session'),
    flash       =   require('connect-flash'),
    cookieParser    =   require('cookie-parser'),
    passport = require('passport'),
    app         = express();

//db Connection
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);


//starting server port
var port    =   process.env.PORT || 8080;

//passport configuration and required
require('./config/passport.js')(passport);
app.use(session({ secret: 'seugneBethiodieuredieufway' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(application_root ,'../client')));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser()); 

/********************************* routes**********************************/ 
//passeport
require('./route/passport.js')(app, passport); 

app.listen(port, function(){
    console.log("node server on port : " + port);
    console.log("application_root : " + application_root);
})