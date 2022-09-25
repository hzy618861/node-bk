const sequelize = require('sequelize')
const config = {
    host:'localhost',
    dialect: 'mysql'
}
//线上环境 使用连接池
config.pool = {
    max:5, //连接池最大的连接数量
    min:0,
    idle:10000 //如果一个连接池10s没有被使用则释放
}
const seq = new sequelize('koa2-weibo','root','123456',config)
module.exports = seq

// 测试链接
// seq.authenticate().then(()=>{
//      console.log('ok')
// }).catch(()=>{
//      console.log('err')
// })