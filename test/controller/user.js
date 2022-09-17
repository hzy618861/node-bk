
const {exec} = require('../db/mysql')
const genPassword = require('../utils/crpy')
const Login = async (username,password) => {
   password = genPassword(password)
   const sql = `select username,realname from users where username="${username}" and password="${password}"`
   return await exec(sql).then(rows => {
    return  rows[0] || {}
})
}
module.exports = {
    Login
}