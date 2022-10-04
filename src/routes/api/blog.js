const { loginCheck } = require('../../middleware/loginChecks')
const {create, getHomeBlogList} = require('../../controller/blog')
const { genValidator } = require('../../middleware/validator')
const blogValidate = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')
const router = require('koa-router')()

router.prefix('/api/blog')
router.post('/create', loginCheck, genValidator(blogValidate) ,async (ctx, next) => {
    const {content,image} = ctx.request.body
    const {id: userId} = ctx.session.userInfo
    ctx.body =  await create({
        content,image,userId
    }) 
})  

router.get('/loadMore/:pageIndex', loginCheck,async (ctx, next) => {
    let {pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const {id: userId} = ctx.session.userInfo
    const result =  await getHomeBlogList({userId,pageIndex})
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
}) 


module.exports = router