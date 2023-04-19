var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

var Doctor = require("./models/doctor");

// We can seed the collection if needed on server start
async function recreateDB(){
 // Delete everything
  await Doctor.deleteMany();
  let instance1 = new Doctor({name:"Rodger", age:32, location:"west"});
  instance1.save().then(doc=>{
    console.log("First object saved")}
  ).catch(err=>{
    console.error(err)})
  let instance2 = new Doctor({name:"Carly", age:28, location:"east"});
  instance2.save().then(doc=>{
    console.log("Second object saved")}
  ).catch(err=>{
    console.error(err)})
  let instance3 = new Doctor({name:"John", age:54, location:"west"});
    instance3.save().then(doc=>{
      console.log("Third object saved")}
    ).catch(err=>{
      console.error(err)})
}
let reseed = false;
if (reseed) { recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorsRouter = require('./routes/doctors');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctors', doctorsRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

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