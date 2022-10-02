const router = require('koa-router')()


const hasLogin = (ctx) => {
    return  {
      isLogin: !!ctx.session.userInfo,
      userName: ctx.session.userInfo && ctx.session.userInfo.userName
   }
}
router.get('/login', async (ctx, next) => {
   await ctx.render('login',hasLogin(ctx))
})
router.get('/register', async (ctx, next) => {
    await ctx.render('register',hasLogin(ctx))
 })

module.exports = router