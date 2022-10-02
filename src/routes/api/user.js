const router = require('koa-router')()
const {isExist,register,login,deleteCurUser} = require('../../controller/user')
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

module.exports = router