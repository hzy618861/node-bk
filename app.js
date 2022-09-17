const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const morgan = require('koa-morgan')
const views = require('koa-views')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const {REDIS_CONF} = require('./config/db')
const index = require('./routes/index')
const users = require('./routes/users')
const user = require('./routes/user')
const blog = require('./routes/blog')
const app = new Koa()
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const env = process.env.NODE_ENV == 'dev' ? 'dev' :' combined'
if(env=='dev'){
  app.use(morgan('dev',{
     stream:process.stdout //默认值，写入控制台
  }));  //默认控制台打印日志
}else{
  //线上日志写入文件
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName,{
    flags:'a'
  })
  app.use(morgan('combined',{
    stream: writeStream
  }));
}
//session配置
app.keys = ['asdasdg11324_']
app.use(session({
  //配置cookie
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge: 24*60*60*1000
  },
  //配置redis
  store: redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), users.allowedMethods())
app.use(user.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
