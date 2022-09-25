const sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config')
const { host, database, user, password } = MYSQL_CONF
const config = {
    host,
    dialect: 'mysql'
}
const env = process.env.NODE_ENV
if (env == 'production') {
    //线上环境 使用连接池
    config.pool = {
        max: 5, //连接池最大的连接数量
        min: 0,
        idle: 10000 //如果一个连接池10s没有被使用则释放
    }
}
if(env == 'test'){
     config.logging = () => {}  //test不打印sql语句
}
const seq = new sequelize(database, user, password, config)
module.exports = seq

// 测试链接
// seq.authenticate().then(()=>{
//      console.log('ok')
// }).catch(()=>{
//      console.log('err')
// })