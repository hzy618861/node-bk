const http = require('http')
function parseQuery(url){
    let query = {}
    const map =  new URLSearchParams(url.split('?')[1])
    map.forEach((value,key)=>{
       query[key] = value
    })
    return query
}
const server = http.createServer((req,res)=>{
     const method = req.method
     const url = req.url
     const path = url.split('?')[0]
     const query = parseQuery(url)
     //设置返回格式为json
     res.setHeader('Content-type','application/json')  //指定返回字符串格式
     const resData = { 
         method,
         url,
         path,
         query
     }
     if(method=='GET'){
        res.end(JSON.stringify(resData))
     }
     if(method=='POST'){
        let postData = ''
        req.on('data',chunk=>{
            postData+=chunk.toString()
        })
        req.on('end',()=>{
            resData.postData = postData
            res.end(JSON.stringify(resData))
        })
     }
})
server.listen(8000)