var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var RedisStore = require('connect-redis')(session);
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();


const env = process.env.NODE_ENV == 'dev' ? 'dev' :' combined'
if(env=='dev'){
  app.use(logger('dev',{
     stream:process.stdout //默认值，写入控制台
  }));  //默认控制台打印日志
}else{
  //线上日志写入文件
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName,{
    flags:'a'
  })
  app.use(logger('combined',{
    stream: writeStream
  }));
}
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
