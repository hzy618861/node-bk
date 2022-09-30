# koa2 模拟新浪微博


# 技术选型
koa2 + mysql + session + redis  + ejs + jest 

# 创建项目
`npm i koa-generator -g`

- koa2 -e  项目名     -e使用ejs模版引擎

# ejs 模版引擎
## 变量
```
<h1><%= title %></h1>
<h1><%= locals.name %></h1>   当name没有传不会报错
```

## 条件判断

```
<h1><%= if(isTrue)  { %>
   a
<% } else {%>
   b
<% } %>

</h1>
```


## 组件

```
<%- include('component/a.ejs',{a:1})%>
```

## 循环
```
<ul>
    <% blogList.forEach(blog => { %>
    <li data-id="<%= blog.id %>"><%= blog.name %></li>
    <% }) %>
</ul>
```
## ejs内部写js
```
<script>
    ...
</script>

```
## sequelize
- ORM  对象关系映射（英语：Object Relational Mapping）
- sequelize是nodejs的第三方库

### 安装
`npm i mysql2 sequelize -S`

```js
const sequelize = require('sequelize')
const config = {
    host:'localhost',
    dialect: 'mysql'
}
const seq = new sequelize('koa2-weibo','root','123456',config)
module.exports = seq

// 测试链接
// seq.authenticate().then(()=>{
//      console.log('ok')
// }).catch(()=>{
//      console.log('err')
// })

```

### jwt vs session
- jwt 用户信息存在在客户端，不依赖cookie，可跨域
- session 用户信息存储在服务端，依赖cookie，默认不可跨域

#### jwt koa2中使用
- app.js 校验jwt
```js
const app = new Koa()
const jwt = require('koa-jwt')

app.use(jwt({
  secret:SECRET
}).unless({
  path:[/^\/users\/login/]  //哪些目录忽略jwt
}))
```

- users.js  生成jwt 解析jwt
```js

const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
router.post('/login', async function (ctx, next) {
  const {username,password} = ctx.request.body
  let userInfo
  if(username=='zhangsan' && password == '123'){
     userInfo = {
       userId:1,
       username,
       nickname: '张三'
     }
  }
  let token 
  if(!userInfo){
      ctx.body ={
        errno:-1,
        msg:"登陆失败"
      }
  }else{
    token = jwt.sign(userInfo,SECRET,{expiresIn:'1h'})
    ctx.body ={
      errno:0,
      msg:"登陆成功",
      token
    }
  }
})

router.get('/userInfo', async function (ctx, next) {
  //通过token解析用户信息
  const token = ctx.header.authorization
  try{
    const payload = await verify(token.split(' ')[1],SECRET)
    ctx.body = {
      errno:0,
      userInfo:payload
   }
  }catch(err){
    ctx.body = {
      errno:-1,
      msg:"verify fail"
   }
  }
 
  //请求头携带token： Authorization: Bearer +token
})

```