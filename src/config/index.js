const env = process.env.NODE_ENV || 'dev'
let MYSQL_CONF
let REDIS_CONF
if (env == 'dev' || env == 'test') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koa2-weibo'
    }
    REDIS_CONF = {
        host: 'localhost',
        port: '6379',
    }
}
if (env == 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koa2-weibo'
    }
    REDIS_CONF = {
        host: 'localhost',
        port: '6379',
    }
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}

