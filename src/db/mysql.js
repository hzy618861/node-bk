const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')
const con = mysql.createConnection(MYSQL_CONF)
con.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })

}
module.exports = {
    exec,
    escape: mysql.escape
}
