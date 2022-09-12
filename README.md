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
