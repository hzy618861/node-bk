# nodejs学习

# 安装
- 1 普通安装 官网安装   https://nodejs.org/en/
- 2 nvm 方式
   `brew install nvm`
```
nvm list  查看版本
nvm install  xx 安装指定版本
nvm use xx  使用指定版本
```

# nodejs与浏览器javascript区别


ECMAScript:  定义了语法，nodejs与浏览器javascript都必须遵守

* 变量定义 循环 函数 闭包...

* javascript使用了ECMAScript语法规范，外加web api 

* nodejs 使用了ECMAScript语法规范，外加nodejs api  



# crontab
* crontab -e 打开编辑器
- linux定时任务
  *   0   *   *   *   sh /Users/huangzhongyuan/learn/node-bk/src/utils/copy.sh
  分钟 小时 天  月  星期  脚本
  每天凌晨执行对应脚本任务
* crontab -l 查看任务
* crontab -r 删除任务


# sql注入
- const mysql = require('mysql')
- 使用mysql.escape对用户输入的字符进行转化，防止sql拼接问题
```
    id = escape(id)  //防止sql注入
    let sql = `select * from blogs where id=${id}`
    // let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(res=>{
          return res[0]
    })
```

# xss攻击
npm i  xss -S 

```
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
```






