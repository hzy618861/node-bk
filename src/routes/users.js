const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const {SECRET} =  require('../config/constants')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async function (ctx, next) {
  const {username,password} = ctx.request.body
  let userInfo
  if(username=='zhangsan' && password == '123'){
     userInfo = {
       userId:1,
       username,
       nickname: '张三'
     }
  }
  let token 
  if(!userInfo){
      ctx.body ={
        errno:-1,
        msg:"登陆失败"
      }
  }else{
    token = jwt.sign(userInfo,SECRET,{expiresIn:'1h'})
    ctx.body ={
      errno:0,
      msg:"登陆成功",
      token
    }
  }
})

router.get('/userInfo', async function (ctx, next) {
  //通过token解析用户信息
  const token = ctx.header.authorization
  try{
    const payload = await verify(token.split(' ')[1],SECRET)
    ctx.body = {
      errno:0,
      userInfo:payload
   }
  }catch(err){
    ctx.body = {
      errno:-1,
      msg:"verify fail"
   }
  }
 
  //请求头携带token： Authorization: Bearer +token
})
module.exports = router
