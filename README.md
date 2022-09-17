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



# git 不同分支拷贝代码

git checkout  要拷贝的文件所在分支  文件路径

# 集成日志

`npm i koa-morgan -S`
const morgan = require('koa-morgan')
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




