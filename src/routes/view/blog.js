const { getProfileBlogList } = require('../../controller/blog')
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

router.get('/profile',loginRedirect ,async (ctx, next) => {
    const {userName} = ctx.session.userInfo
    ctx.redirect('/profile/'+userName)
 })
router.get('/profile/:userName',loginRedirect ,async (ctx, next) => {
    const isMe = ctx.params.userName === ctx.session.userInfo.userName
    const result = await getProfileBlogList(ctx.params.userName,0)
    await ctx.render('profile',{
     blogData:{
        ...result.data
     },
     userData:{
         isMe,
         amIFollowed: true,
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



module.exports = router
