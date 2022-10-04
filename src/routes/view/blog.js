const { getProfileBlogList, getSquareBlogList, getHomeBlogList } = require('../../controller/blog')
const { getFans, getFollowers } = require('../../controller/userRelation')
const { loginRedirect } = require('../../middleware/loginChecks')
const { isExist } = require('../../controller/user')
const { PAGE_SIZE } = require('../../config/constants')
const router = require('koa-router')()



//error
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    //获取第一页数据
    const res = await getHomeBlogList({ userId: userInfo.id,pageSize:PAGE_SIZE })
    //获取粉丝
    const fanResult = await getFans(userInfo.id)
    //获取关注人列表
    const followers = await getFollowers(userInfo.id)
    await ctx.render('index', {
        blogData: {
            ...res.data
       },
        userData: {
            userInfo: ctx.session.userInfo,
            atCount: 0,
            fansData: {
                count: fanResult.data.count,
                list: fanResult.data.userList,
            },
            followersData: {
                count: followers.data.count,
                list: followers.data.userList
            }
        }
    })
})

router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect('/profile/' + userName)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const curName = ctx.session.userInfo.userName
    const isMe = ctx.params.userName === ctx.session.userInfo.userName
    const result = await getProfileBlogList(ctx.params.userName, 0)

    let userInfo = {}
    if (isMe) {
        // 是当前登录用户
        userInfo = ctx.session.userInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(ctx.params.userName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        userInfo = existResult.data
    }
    //获取粉丝
    const fanResult = await getFans(userInfo.id)

    // 我是否关注了此人
    const amIFollowed = fanResult.data.userList.some(item => item.userName == curName)

    //获取关注人列表
    const followers = await getFollowers(userInfo.id)
    await ctx.render('profile', {
        blogData: {
            ...result.data
        },
        userData: {
            isMe,
            amIFollowed,
            userInfo,
            atCount: 0,
            fansData: { //粉丝列表
                count: fanResult.data.count,
                list: fanResult.data.userList,
            },
            followersData: { //关注人列表
                count: followers.data.count,
                list: followers.data.userList
            }
        }
    })
})

router.get('/square', loginRedirect, async (ctx, next) => {
    const res = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = res.data
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },

    })
})




module.exports = router
