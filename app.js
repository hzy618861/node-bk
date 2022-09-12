handleBlogRouter = require('./src/router/blog')
handleUserRouter = require('./src/router/user')
const {get} = require('./src/db/redis')
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
 }
 
//session 数据
// const SESSION_DATA = {}
// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
const serverHandle = async (req,res) => {
    const path = req.url.split('?')[0]
    req.path = path
    req.body =  await getPostData(req)
    //解析query
    function parseQuery(url){
        let query = {}
        const map =  new URLSearchParams(url.split('?')[1])
        map.forEach((value,key)=>{
           query[key] = value
        })
        return query
    }
    req.query = parseQuery(req.url)
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item=>{
         if(!item) return
         const arr = item.split('=')
         const key = arr[0].trim()
         const value = arr[1].trim()
         req.cookie[key] = value
    })
    //解析 session
    let userId = req.cookie.userid
    const sessionData = await get(userId || '')
    if(sessionData){
        req.session = sessionData
    }else{
        req.session = {}
    }
    res.setHeader('Content-type','application/json')  //指定返回字符串格式
    const blogData = await handleBlogRouter(req,res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }
    const userData = await handleUserRouter(req,res)
    if(userData){
        res.end(JSON.stringify(userData))
        return
    }
    res.writeHead(404,{'Content-type':'text/plain'})
    res.write('404 not found')
    res.end()
}
module.exports = serverHandle