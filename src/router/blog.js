const {
   getList,
   getDetail,
   newBlog,
   updateBlog,
   deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = async (req, res) => {
   const method = req.method
   const path = req.path
   const id = req.query.id
   if (method === 'GET' && path == '/api/blog/list') {
      const author = req.query.author || ''
      const keyword = req.query.keyword || ''
      const result = await getList(author, keyword)
      return new SuccessModel(result)
   }
   if (method === 'GET' && path == '/api/blog/detail') {
      const data = await getDetail(id)
      return new SuccessModel(data)
   }
   if (method === 'POST' && path == '/api/blog/new') {
      const blogData = req.body
      const data = await newBlog(blogData)
      return new SuccessModel(data)
   }
   if (method === 'POST' && path == '/api/blog/update') {
      const data = await updateBlog(id, req.body)
      if (data) {
         return new SuccessModel(data)
      } else {
         return new ErrorModel('更新博客失败')
      }
   }
   if (method === 'POST' && path == '/api/blog/del') {
      const data = await deleteBlog(id,req.body.author)
      if (data) {
         return new SuccessModel(data)
      } else {
         return new ErrorModel('删除失败')
      }
   }
}
module.exports = handleBlogRouter


