const redis = require('redis')
const { REDIS_CONF } = require('../config/db')
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err)
})
function set(key, value, expire) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
    redisClient.expire(key, expire);
}
function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err)
            } else {
                if (value == null) {
                    resolve(value)
                } else {
                    try {
                        resolve(JSON.parse(value))
                    } catch (e) {
                        resolve(value)
                    }
                }

            }
        })
    })
}
module.exports = {
    set,
    get
}


