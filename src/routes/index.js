const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa !',
    blogList:[
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
  ctx.body = {
    title: 'koa2 json'
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
