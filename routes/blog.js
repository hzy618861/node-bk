const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const cons = require('consolidate')
router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  const author = ctx.session.username || ''
  const keyword = ctx.query.keyword || ''
  const result = await getList(author, keyword)
  ctx.body = new SuccessModel(result)
})
router.get('/detail', async function (ctx, next) {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new',loginCheck, async function (ctx, next) {
  const blogData = ctx.request.body
  blogData.author = ctx.session.username
  const data = await newBlog(blogData)
  ctx.body = new SuccessModel(data)
})
router.post('/update',loginCheck, async function (ctx, next) {
  const data = await updateBlog(ctx.query.id, ctx.request.body)
  if (data) {
    ctx.body = new SuccessModel(data)
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})
router.post('/del',loginCheck, async function (ctx, next) {
  const data = await deleteBlog(ctx.query.id, ctx.session.username)
  if (data) {
    ctx.body = new SuccessModel(data)
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})
module.exports = router
