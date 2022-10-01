const router = require('koa-router')()
const {isExist} = require('../../controller/user')
router.prefix('/api/user')
router.post('/register', async (ctx, next) => {
    const {userName,password} = ctx.request.body
    //controller
    ctx.body =  await isExist(userName) 
})  

router.post('/isExist', async (ctx, next) => {
    const {userName} = ctx.request.body
    //controller
    ctx.body =  await isExist(userName) 
})

module.exports = router