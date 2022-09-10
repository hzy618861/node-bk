const {
   getList,
   getDetail,
   newBlog,
   updateBlog,
   deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
   const method = req.method
   const path = req.path
   const id = req.query.id
   if (method === 'GET' && path == '/api/blog/list') {
      const author = req.query.author || ''
      const keyword = req.query.keyword || ''
      const listData = getList(author, keyword)
      return new SuccessModel(listData)
   }
   if (method === 'GET' && path == '/api/blog/detail') {
      const data = getDetail(id)
      return new SuccessModel(data)
   }
   if (method === 'POST' && path == '/api/blog/new') {
      const blogData = req.body
      const data = newBlog(blogData)
      return new SuccessModel(data)
   }
   if (method === 'POST' && path == '/api/blog/update') {
      const data = updateBlog(id, req.body)
      if (data) {
         return new SuccessModel(data)
      } else {
         return new ErrorModel('更新失败')
      }
   }
   if (method === 'POST' && path == '/api/blog/del') {
      const data = deleteBlog(id)
      if (data) {
         return new SuccessModel(data)
      } else {
         return new ErrorModel('删除失败')
      }
   }
}
module.exports = handleBlogRouter


