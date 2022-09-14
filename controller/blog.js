const {exec,escape} = require('../db/mysql')
const xss = require('xss')
const getList = (author,keyword) => {
     let sql = `select * from blogs where 1=1 `
     if(author){
         sql+=`and author='${author}' `
     }
     if(keyword){
        sql+=`and title like '%${keyword}%' `
     }
     console.log('sql:',sql)
     sql+=`order by createTime asc;`
     return exec(sql)
}
const getDetail = (id) => {
    id = escape(id)  //防止sql注入
    let sql = `select * from blogs where id=${id}`
    // let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(res=>{
          return res[0]
    })
}
const newBlog = (blogData = {}) => {
    let {title,content,author} = blogData
    title = xss(title)
    content = xss(content)
    author = xss(author)
    const createTime = Date.now()
    const sql = `insert into blogs (title,content,createTime,author) values('${title}','${content}','${createTime}','${author}');`
    return exec(sql).then(insertData => {
         return {
             id: insertData.insertId
         }
    })
}
const updateBlog = (id,blogData = {}) => {
    const {title,content} = blogData
    const sql = `update blogs set title='${title}',content='${content}' where id=${id}`
    return exec(sql).then(updateData => {
        if(updateData.affectedRows>0){
            return true
        }else{
            return false
        }
   })
}
const deleteBlog = (id,author) => {
    const sql = `delete from blogs  where id=${id} and author='${author}'`
    return exec(sql).then(deleteData => {
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