const http = require('http')
const server = http.createServer((req,res)=>{
     console.log(req.method)
     console.log(req.url)
     const url = req.url
     const map =  new URLSearchParams(url.split('?')[1])
     req.query = {}
     map.forEach((value,key)=>{
        req.query[key] = value
     })
     res.end(JSON.stringify(req.query))
})
server.listen(8000)