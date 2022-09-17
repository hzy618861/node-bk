const http = require('http')
const slice = Array.prototype.slice
class LikeExpress {
    constructor() {
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }
    register(path) {
        const info = {}
        if (typeof path === 'string') {
            info.path = path
            info.stack = slice.call(arguments, 1)  //保存中间件
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)  //保存中间件
        }
        return info
    }
    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }
    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
        console.log('get',this.routes.get)
    }
    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }
    match(method, url) {
        console.log('url1111:',url)
        let stack = [] //匹配的中间件列表
        if (url == '/favicon.ico') {
            return stack
        }
        //curRoutes 获取可用的中间件
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])
        console.log('草泥马',curRoutes)
        curRoutes.forEach(routeInfo => {
            console.log('url=',url)
            console.log('匹配=', (url.indexOf(routeInfo.path) === 0) )
            if (url.indexOf(routeInfo.path) === 0) {
                stack = stack.concat(routeInfo.stack)
            }
        })
        console.log('stack',stack)
        return stack
    }
    //核心 next机制
    handle(req, res, stack) {
        console.log(stack)
        const next = () => {
            //拿到第一个匹配到的中间件
            const middleware = stack.shift()
            middleware && middleware(req, res, next)
        }
        next()
    }
    callback() {
        return (req, res) => {
            console.log(req.url)
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }
            const url = req.url
            const method = req.method.toLowerCase()
            console.log('urlUrl:',req.url)
            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}
module.exports = () => {
    return new LikeExpress()
}