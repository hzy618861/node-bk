const { getProfileBlogList, getSquareBlogList, getHomeBlogList } = require('../../controller/blog')
const { getFans, getFollowers, getAtCount, getAtMeBlogList, markAdRead } = require('../../controller/userRelation')
const { loginRedirect } = require('../../middleware/loginChecks')
const { isExist } = require('../../controller/user')
const { PAGE_SIZE } = require('../../config/constants')
const router = require('koa-router')()



//error
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    //获取第一页数据
    const res = await getHomeBlogList({ userId: userInfo.id, pageSize: PAGE_SIZE })
    //获取粉丝
    const fanResult = await getFans(userInfo.id)
    //获取关注人列表
    const followers = await getFollowers(userInfo.id)
    //@ 数量
    const countResult = await getAtCount(userInfo.id)
    await ctx.render('index', {
        blogData: {
            ...res.data
        },
        userData: {
            userInfo: ctx.session.userInfo,
            atCount: countResult.data.count,
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

    //@ 数量
    const countResult = await getAtCount(ctx.session.userInfo.id)
    await ctx.render('profile', {
        blogData: {
            ...result.data
        },
        userData: {
            isMe,
            amIFollowed,
            userInfo,
            atCount: countResult.data.count,
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
router.get('/at-me', loginRedirect, async (ctx, next) => {
    const { id } = ctx.session.userInfo
    //@ 数量
    const countResult = await getAtCount(id)
    //第一页数据
    const res = await getAtMeBlogList(id, 0)
    await ctx.render('atMe', {
        atCount: countResult.data.count,
        blogData: res.data
        //标记已读


    })
    if(countResult.data.count > 0) {
         await markAdRead(id)
    }
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
