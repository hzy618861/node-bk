handleBlogRouter = require('./src/router/blog')
handleUserRouter = require('./src/router/user')
const serverHandle = (req,res) => {
    const path = req.url.split('?')[0]
    req.path = path
    //解析query
    function parseQuery(url){
         const query = url.
    }
    req.query = parseQuery(req.url.split('?')[1])
    res.setHeader('Content-type','application/json')  //指定返回字符串格式
    const blogData = handleBlogRouter(req,res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }
    const userData = handleUserRouter(req,res)
    if(userData){
        res.end(JSON.stringify(userData))
        return
    }
    res.writeHead(404,{'Content-type':'text/plain'})
    res.write('404 not found')
    res.end()
}
module.exports = serverHandle