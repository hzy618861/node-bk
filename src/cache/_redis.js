const redis = require('redis')
const { REDIS_CONF } = require('../config')
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err)
})

/**
 * 
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)

}
/**
 * 
 * @param {string} key 
 */
function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
            } else {
                try {
                    resolve(JSON.parse(val))
                }
                catch (e) {
                    resolve(val)
                }
            }
        })
    })
}
module.exports = {
    get,
    set
}