const { getProfileBlogList, getSquareBlogList } = require('../../controller/blog')
const { loginRedirect } = require('../../middleware/loginChecks')

const router = require('koa-router')()



//error
router.get('/',loginRedirect ,async (ctx, next) => {
   await ctx.render('index',{
    blogData:{
        isEmpty: true,
        blogList:[
            
        ]
    },
    userData:{
        userInfo:ctx.session.userInfo,
        atCount:0,
        fansData:{
            count:0,
            list:[]
        },
        followersData:{
            count:0,
            list:[]
        }
    }
   })
})



router.get('/square',loginRedirect ,async (ctx, next) => {
     const res = await getSquareBlogList(0)
     const {isEmpty,blogList,pageSize,pageIndex,count} = res.data
     await ctx.render('square',{
         blogData:{
            isEmpty,blogList,pageSize,pageIndex,count
         }
     })
 })




module.exports = router
