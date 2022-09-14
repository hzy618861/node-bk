var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var RedisStore = require('connect-redis')(session);
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();



app.use(logger('dev'));
app.use(express.json()); //解析post参数 req.body
app.use(express.urlencoded({ extended: false })); // 
app.use(cookieParser());
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
    client: redisClient
})
app.use(session({
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  secret: 'wakdsashda_asdasd123',
  cookie: {
    path: '/',  //默认
    httpOnly: true,//默认
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
