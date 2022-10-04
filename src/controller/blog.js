const { SuccessModel, ErrorModel } = require("../model/resModel")
const { createBlog, getBlogListByUser, getFollowersBlogList } = require("../services/blog")
const { PAGE_SIZE } = require("../config/constants")
const xss = require('xss')
const { getSquareCacheList } = require("../cache/blog")
const { getUserInfo } = require("../services/user")
const { createAtRelation, getAtRelationCount } = require("../services/atRelation")
async function create({ userId, content, image }) {
  // content 中有@关系 
  const atUserNameList = []
  content = content.replace(/@(.+?)\s-\s(\w+?)\b/g,(matchStr,nickName,userName)=>{
     atUserNameList.push(userName)
     return matchStr
  })
  // 根据@用户名查询用户信息
  const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)))
  const atUserListId = atUserList.map(item=>item.id)
  try {
    const blog = await createBlog({ userId, content: xss(content), image })
    //创建@关系
    await Promise.all(atUserListId.map(userId=>createAtRelation(blog.id,userId)))
    return new SuccessModel(blog)
  } catch (e) {
    console.log(e)
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

async function getHomeBlogList({userId, pageIndex = 0 ,pageSize = 5}) {
  const res = await getFollowersBlogList({userId, pageIndex, pageSize})
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
  getSquareBlogList,
  getHomeBlogList,
}