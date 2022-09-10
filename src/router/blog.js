const {getList,getDetail}  = require('../controller/blog')
const {SuccessModel,ErrorModel}  = require('../model/resModel')
const handleBlogRoyer = (req,res)=>{
      const method = req.method
      const path = req.path 
      if(method==='GET' && path =='/api/blog/list'){
         const author = req.query.author || ''
         const keyword = req.query.keyword || ''
         const listData = getList(author,keyword)
         return new SuccessModel(listData)
      }
      if(method==='GET' && path =='/api/blog/detail'){
         const id = req.query.id
         const data = getDetail(id)
        return new SuccessModel(data)
      }
      if(method==='POST' && path =='/api/blog/new'){
        return {
           msg: '新建博客'
        }
      }
      if(method==='POST' && path =='/api/blog/update'){
        return {
           msg: '更新博客'
        }
      }
      if(method==='POST' && path =='/api/blog/del'){
        return {
           msg: '删除博客'
        }
      }
}
module.exports = handleBlogRoyer


