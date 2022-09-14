var express = require('express');
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
var router = express.Router();

router.get('/list', loginCheck, async function (req, res, next) {
  const author = req.session.username || ''
  const keyword = req.query.keyword || ''
  const result = await getList(author, keyword)
  res.json(new SuccessModel(result))
});
router.get('/detail', loginCheck, async function (req, res, next) {
  const data = await getDetail(req.query.id)
  res.json(new SuccessModel(data))
});

router.post('/new', loginCheck, async function (req, res, next) {
  const blogData = req.body
  blogData.author = req.session.username
  const data = await newBlog(blogData)
  res.json(new SuccessModel(data))
});

router.post('/update', loginCheck, async function (req, res, next) {
      const data = await updateBlog(req.query.id, req.body)
      if (data) {
        res.json(new SuccessModel(data))
      } else {
         res.json(new ErrorModel('更新博客失败'))
      }
});

router.post('/del', loginCheck, async function (req, res, next) {
  const data = await deleteBlog(req.query.id, req.session.username)
  if (data) {
     res.json(new SuccessModel(data))
  } else {
    res.json(new ErrorModel('删除失败'))
  }
});

module.exports = router;
