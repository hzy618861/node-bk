const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa !',
    blogData:[
      {
        id:1,
        name:'a'
      },
      {
        id:2,
        name:'b'
      }

    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if(session.viewNum == null){
  //   session.viewNum = 0
  // }
  // session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum 
  }
})

router.get('/profile/:username', async (ctx, next) => {
  const {username} = ctx.params
  ctx.body = {
    title: 'profile',
    username
  }
})

module.exports = router
