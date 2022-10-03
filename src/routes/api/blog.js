const { loginCheck } = require('../../middleware/loginChecks')
const {create} = require('../../controller/blog')
const { genValidator } = require('../../middleware/validator')
const blogValidate = require('../../validator/blog')
const router = require('koa-router')()

router.prefix('/api/blog')
router.post('/create', loginCheck, genValidator(blogValidate) ,async (ctx, next) => {
    const {content,image} = ctx.request.body
    const {id: userId} = ctx.session.userInfo
    ctx.body =  await create({
        content,image,userId
    }) 
})  


module.exports = router