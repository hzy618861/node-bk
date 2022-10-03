const { getProfileBlogList } = require('../../controller/blog')
const { follow,unFollow } = require('../../controller/userRelation')
const { loginCheck } = require('../../middleware/loginChecks')
const { getBlogListStr } = require('../../utils/blog')
const router = require('koa-router')()

router.prefix('/api/profile')
router.get('/loadMore/:userName/:pageIndex', loginCheck,async (ctx, next) => {
    let {userName,pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const result =  await getProfileBlogList({
        userName,pageIndex
    }) 
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result

})  
router.post('/follow', loginCheck,async (ctx, next) => {
   const {id: myUserId} = ctx.session.userInfo
   const {userId: cuUserId} = ctx.request.body
   ctx.body = await follow(myUserId,cuUserId)

}) 
router.post('/unfollow', loginCheck,async (ctx, next) => {
    const {id: myUserId} = ctx.session.userInfo
    const {userId: cuUserId} = ctx.request.body
    ctx.body = await unFollow(myUserId,cuUserId)
}) 


module.exports = router