# koa
- web server 框架
   
# 脚手架
koa-generator
`npm i express-koa -g`
运行 koa2 目录名   初始化项目

`npm install && npm run dev`

# 集成session
`npm i koa-generic-session koa-redis redis -S`

- const session = require('koa-generic-session')
- const redisStore = require('koa-redis')

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
    all:'localhost:6379'
  })
}))




