var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const doctorsRouter = require('./routes/doctors');
const patientsRouter = require('./routes/patients');
const reportsRouter = require('./routes/reports');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/patients', patientsRouter);
app.use('/reports', reportsRouter);

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/myDB2')
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        renderErrorPage(err, app);
    });
// Function to render error page
function renderErrorPage(err, app) {
  app.use(function(req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: app.get('env') === 'development' ? err : {}
      });
  });
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
