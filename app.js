const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// import history from 'connect-history-api-fallback'

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const doctorsRouter = require('./routes/doctors')
const apiRouter = require('./routes/api')

const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(history())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apii/', (req, res) => {
    console.log(req)
    res.end('233')
})

// route area
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctors', doctorsRouter)
app.use('/api', apiRouter)
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
