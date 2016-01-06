// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');

// *** routes *** //
var routes = require('./routes/index.js');
var blogRoutes = require('./routes/blogRoutes.js');
var localAuthRoutes = require('./routes/localAuth.js');
// *** express instance *** //
var app = express();

// *** Mongoose Connections *** //
var dbs = {
  test: 'mongodb://localhost/blog-test',
  development: 'mongodb://localhost/blog'
};
console.log('env =', process.env.NODE_ENV);
var mongoose = require('mongoose');
// mongoose.connect(dbs[process.env.NODE_ENV]);
var mongo_uri = process.env.MONGOLAB_URI || 'mongodb://localhost/blog';
mongoose.connect(mongo_uri);

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client')));

// ** configure passport **//
var User = require('./models/users');
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// *** main routes *** //
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/', 'layout.html'));
});
app.use('/', routes);
app.use('/api', blogRoutes);
app.use('/local', localAuthRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
