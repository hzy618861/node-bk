# koa2 模拟新浪微博


# 技术选型
koa2 + mysql + session + redis  + ejs + jest 

# 创建项目
`npm i koa-generator -g`

- koa2 -e  项目名     -e使用ejs模版引擎

# ejs 模版引擎
## 变量

<h1><%= title %></h1>
<h1><%= locals.name %></h1>   当name没有传不会报错

## 条件判断

<h1><%= if(isTrue)  { %>
   a
<% } else {%>
   b
<% } %>

</h1>


## 组件

<%- include('component/a.ejs',{a:1})%>

## 循环
<ul>
    <% blogList.forEach(blog => { %>
    <li data-id="<%= blog.id %>"><%= blog.name %></li>
    <% }) %>
</ul>

## ejs内部写js

<script>
    ...
</script>


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
