const router = require('koa-router')()
const {isExist,register} = require('../../controller/user')
const { genValidator } = require('../../middleware/validator')
const userValidate = require('../../validator/User')
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

module.exports = router