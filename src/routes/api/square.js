const { getSquareBlogList } = require('../../controller/blog')
const { loginCheck } = require('../../middleware/loginChecks')
const { getBlogListStr } = require('../../utils/blog')
const router = require('koa-router')()

router.prefix('/api/square')
router.get('/loadMore/:pageIndex', loginCheck,async (ctx, next) => {
    let {pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const result =  await getSquareBlogList(pageIndex)
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result

})  


module.exports = router