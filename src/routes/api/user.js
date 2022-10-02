const router = require('koa-router')()
const {isExist,register,login,deleteCurUser, changeInfo, changePasword, logout} = require('../../controller/user')
const { genValidator } = require('../../middleware/validator')
const userValidate = require('../../validator/User')
const { loginCheck } = require('../../middleware/loginChecks')

router.prefix('/api/user')
router.post('/isExist', async (ctx, next) => {
    const {userName} = ctx.request.body
    //controller
    ctx.body =  await isExist(userName) 
})  

router.post('/register',genValidator(userValidate), async (ctx, next) => {
    const {userName,password,gender} = ctx.request.body
    //controller
    ctx.body =  await register({userName,password,gender}) 
})
router.post('/login', async (ctx, next) => {
    const {userName,password} = ctx.request.body
    //controller
    ctx.body =  await login(ctx,userName,password) 
})

router.post('/delete',loginCheck, async (ctx, next) => {
    const {userName} = ctx.session.userInfo
    ctx.body =  await deleteCurUser(userName) 
})


router.patch('/changeInfo',loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {nickName,city,picture} = ctx.request.body
    ctx.body =  await changeInfo(ctx,{nickName,city,picture}) 
})
router.patch('/changePassword',loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {newPassword,password} = ctx.request.body
    ctx.body =  await changePasword(ctx,{newPassword,password}) 
})

router.post('/logout',loginCheck, async (ctx, next) => {
    ctx.body =  await logout(ctx) 
})
module.exports = router