const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
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
    if (result == null) {
        //未找到
        return result
    }
    return formatUser(result.dataValues)

}
/**
 * 
 * @param {string} userName 用户名 
 * @param {string} password 密码 
 * @param {string} gender 性别 
 * @param {string} nickName 昵称 
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    return await User.create({
        userName, password, gender, nickName: nickName ? nickName : userName
    })
}
async function deleteUser(userName) {
    const res = await User.destroy({
        where: {
            userName
        }
    })
    return res > 0
}
async function updateUser({
    newPassword,
    newNickName,
    newPicture,
    newCity
},{
    userName,
    password
}) {
    const updateData = {}
    if(newPassword) updateData.password = newPassword
    if(newNickName) updateData.nickName = newNickName
    if(newPicture) updateData.picture = newPicture
    if(newCity) updateData.city = newCity
    const whereData = {
        userName
    }
    if(password) whereData.password = password
    const res = await User.update(updateData,{
         where: whereData
    })
    return res[0] > 0
}
module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}