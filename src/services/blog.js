const { Blog,User } = require('../db/model/index')
const { formatUser } = require('./_format')
const xss = require('xss')
async function createBlog({userId,content,image}) {
    //查询条件
    const result = await Blog.create({
        userId,content,image
    })
    return result.dataValues

}
async function getBlogListByUser({userName,pageIndex = 0 ,pageSize = 10}) {
    //查询条件
    const whereOpts = {}
    if(userName) whereOpts.userName = userName
    const result = await Blog.findAndCountAll({
        limit: pageSize, //每页多少条
        offset: pageSize * pageIndex,  //跳过多少条
        order: [['id','desc']],
        include: [
             {
                model:User,
                attributes: ['userName','nickName','picture'],
                where: whereOpts
             }
        ]
    })
    // result.rows 查询结果数组
    // result.count 总数
    let blogList =  result.rows.map(row=> row.dataValues)
    blogList = blogList.map(blogItem=>{
          blogItem.contentFormat = xss(blogItem.content)
          blogItem.createdAtFormat = blogItem.createdAt.toLocaleString()
          const user = blogItem['user-new'].dataValues
          blogItem.user = formatUser(user)
          return blogItem
    })
    return {
        count: result.count,
        blogList
    }

}
module.exports = {
    createBlog,
    getBlogListByUser
}