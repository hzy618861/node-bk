const crypto = require('crypto')
const SECRET_KEY = 'adsasdj4104_12381237*'

function md5(content){
     const md5 = crypto.createHash('md5')
     return md5.update(content).digest('hex')
}
function doCrypto(content){
    const str = `password=${content}&key=${SECRET_KEY}`
    return md5(str)
}
module.exports = {
    doCrypto
}