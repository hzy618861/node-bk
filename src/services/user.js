const { User } = require('../db/model/index')
const {formatUser} = require('./_format')
async function getUserInfo(userName, password) {
    //查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        whereOpt.password = password
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if(result == null){
         //未找到
         return result
    }
    return formatUser(result.dataValues)

}
module.exports = {
    getUserInfo
}