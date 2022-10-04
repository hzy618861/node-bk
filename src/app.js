const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {REDIS_CONF} = require('./config')
// const jwt = require('koa-jwt')
// const users = require('./routes/users')
const user = require('./routes/view/user')
const blog = require('./routes/view/blog')
const userApi = require('./routes/api/user')
const atApi = require('./routes/api/blog-at')
const squareApi = require('./routes/api/square')
const profileApi = require('./routes/api/profile')
const blogApi = require('./routes/api/blog')
const uploadApi = require('./routes/api/utils/upload')
const errorViewRouter = require('./routes/view/error')
const {SECRET} =  require('./config/constants')
// error handler
const env = process.env.NODE_ENV
if(env=='production'){
  onerror(app,{
    redirect: '/error'
  })
}else if(env=='dev'){
  onerror(app)
}


// app.use(jwt({
//   secret:SECRET
// }).unless({
//   path:[/^\/users\/login/]  //哪些目录忽略jwt
// }))
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// session配置
app.keys = ['Uiadhasdhas_889112;asd']
app.use(session({
  key: 'weobo-sid',  //cookie name 默认是koa.sid
  prefix: 'weibo:sess:', //redis key的前缀 默认为koa:sess:
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge: 24*60*60*1000 //ms
  },
  //ttl:  24*60*60*1000, // redis过期时间  默认和cookie过期时间一样
  store: redisStore({
     all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
// routes

// app.use(users.routes(), users.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(userApi.routes(), userApi.allowedMethods())
app.use(squareApi.routes(), squareApi.allowedMethods())
app.use(atApi.routes(), atApi.allowedMethods())
app.use(blogApi.routes(), blogApi.allowedMethods())
app.use(profileApi.routes(), profileApi.allowedMethods())
app.use(uploadApi.routes(), uploadApi.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
