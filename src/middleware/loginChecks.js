/**
 * 登陆验证中间件
 */

const { ErrorModel } = require("../model/resModel")

async function loginCheck(ctx, next) {
   //api登陆验证
   if (ctx.session.userInfo) {
      await next()
   } else {
      ctx.body = new ErrorModel({
         errno: -1,
         message: '未登陆'
      })
   }
}

async function loginRedirect(ctx, next) {
   //页面登陆验证
   if (ctx.session.userInfo) {
      await next()
   } else {
      const curUrl = ctx.url
      ctx.redirect('/login?url='+encodeURIComponent(curUrl))
   }
}
module.exports = {
   loginCheck,
   loginRedirect
}