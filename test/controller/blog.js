const {exec,escape} = require('../db/mysql')
const xss = require('xss')
const getList = async (author,keyword) => {
     let sql = `select * from blogs where 1=1 `
     if(author){
         sql+=`and author='${author}' `
     }
     if(keyword){
        sql+=`and title like '%${keyword}%' `
     }
     sql+=`order by createTime asc;`
     return await exec(sql)
}
const getDetail = async (id) => {
    id = escape(id)  //防止sql注入
    let sql = `select * from blogs where id=${id}`
    // let sql = `select * from blogs where id='${id}'`
    return await exec(sql).then(res=>{
          return res[0]
    })
}
const newBlog = async (blogData = {}) => {
    let {title,content,author} = blogData
    title = xss(title)
    content = xss(content)
    author = xss(author)
    const createTime = Date.now()
    const sql = `insert into blogs (title,content,createTime,author) values('${title}','${content}','${createTime}','${author}');`
    return await exec(sql).then(insertData => {
         return {
             id: insertData.insertId
         }
    })
}
const updateBlog = async (id,blogData = {}) => {
    const {title,content} = blogData
    const sql = `update blogs set title='${title}',content='${content}' where id=${id}`
    return await exec(sql).then(updateData => {
        if(updateData.affectedRows>0){
            return true
        }else{
            return false
        }
   })
}
const deleteBlog = async (id,author) => {
    const sql = `delete from blogs  where id=${id} and author='${author}'`
    return await exec(sql).then(deleteData => {
        if(deleteData.affectedRows>0){
            return true
        }else{
            return false
        }
   })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}