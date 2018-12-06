const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const DBCONFIG = require('./config/dbconfig');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const helmet = require('helmet')

mongoose.connect(DBCONFIG.DBURL, DBCONFIG.PARAMS, function (err, result) {
  if (err)
    console.log('Unable to connect to MongoDB');
  else{
    console.log('MongoDB started on port: 27017'); 
    //console.log(result.base);
  }
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(fileUpload());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Adding global routes
var APIROUTE = require('./config/APIRoutes');

APIROUTE.forEach(function (object) {
  app.use(object.route, require(object.path));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
