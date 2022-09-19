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