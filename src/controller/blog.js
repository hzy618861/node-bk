const { SuccessModel, ErrorModel } = require("../model/resModel")
const { createBlog, getBlogListByUser } = require("../services/blog")
const { PAGE_SIZE } = require("../config/constants")
const xss = require('xss')
const { getSquareCacheList } = require("../cache/blog")
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({ userId, content: xss(content), image })
    return new SuccessModel(blog)
  } catch (e) {
    return new ErrorModel({
      errno: -1,
      message: '创建微博失败'
    })
  }
}

async function getProfileBlogList({ userName, pageIndex = 0 }) {
  const res = await getBlogListByUser({ userName, pageIndex, pageSize: PAGE_SIZE })
  return new SuccessModel({
    isEmpty: res.blogList.length == 0,
    blogList: res.blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: res.count
  })
}
async function getSquareBlogList(pageIndex = 0) {
  const res = await getSquareCacheList(pageIndex, PAGE_SIZE)
  return new SuccessModel({
    isEmpty: res.blogList.length == 0,
    blogList: res.blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: res.count
  })
}

module.exports = {
  create,
  getProfileBlogList,
  getSquareBlogList
}