const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname,'../views/widgets/blog-list-tmp.ejs'),'utf-8')
function getBlogListStr(blogList = [], canReply = false){
     return ejs.render(BLOG_LIST_TPL,{
        blogList,
        canReply
     })
}
module.exports = {
    getBlogListStr
}