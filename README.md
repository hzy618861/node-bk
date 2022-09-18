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

# pm2
- 进程守护，程序崩溃自动重启
- 启动多进程，充分利用cpu和内存
- 自带日志记录功能

`npm i pm2 -g`
- pm2 --version 查看版本
- pm2 list查看启动列表
- package.json配置启动命令    pm2 start ./bin/www.js 


### 常见命令
pm2 start 文件
pm2 restart id
pm2 stop id
pm2 info id 查看信息
pm2 log id  查看日志
pm2 monit id 查看cpu内存信息


### 配置文件
"prd": "cross-env NODE_ENV=production  pm2 start pm2.config.json"
-  新建 pm2.config.json配置文件
```
{
    "apps":{
        "name":"blog",
        "script":"bin/www.js",
        "watch": false,
        "ignore_watch": ["node_modules","logs"],
        "instances":4,
        "error_file":"logs/err.log",
        "out_file": "logs/out.log",
        "log_date_format": "YYYY-MM-DD HH:mm:ss"
    }
}
```






