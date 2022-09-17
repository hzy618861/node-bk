const router = require('koa-router')()
router.prefix('/api/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')
const {
  Login
} = require('../controller/user')
router.post('/login', async function (ctx, next) {
  const {username,password} = ctx.request.body
  const data = await Login(username,password)
  if(data.username){
     //设置session
     ctx.session.username = data.username
     ctx.session.realname = data.realname
     ctx.body = new SuccessModel('登陆成功')
  }else{
    ctx.body = new ErrorModel('登陆失败')
  }
})

router.get('/session-test', async function (ctx, next) {
  //ctx包含req res 的合并结果
  if (ctx.session.viewCount==null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  ctx.body = {
    errno: 0,
    viewCount:ctx.session.viewCount
  }
})

module.exports = router
