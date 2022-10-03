const { UserRelation, User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 
 * @param {*} followerId  被关注人的ID
 * 获取用户的粉丝  获取关注该用户的用户列表
 */
async function getUsersByFollower(followerId) {
    // SELECT `user-new`.`id`, `user-new`.`userName`, `user-new`.`nickName`, `user-new`.`picture`, `UserRelations`.`id` AS `UserRelations.id`, `UserRelations`.`userId` AS `UserRelations.userId`, `UserRelations`.`followerId` AS `UserRelations.followerId`, `UserRelations`.`createdAt` AS `UserRelations.createdAt`, `UserRelations`.`updatedAt` AS `UserRelations.updatedAt` FROM `user-news` AS `user-new` INNER JOIN `UserRelations` AS `UserRelations` ON `user-new`.`id` = `UserRelations`.`userId` AND `UserRelations`.`followerId` = 'zhangsan' ORDER BY `user-new`.`id` DESC
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        // INNER JOIN `UserRelations` ON `user-new`.`id` = `UserRelations`.`userId` AND `UserRelations`.`followerId` = 'zhangsan' 
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })
    let userList = result.rows.map(item => item.dataValues)
    userList = formatUser(userList)
    return {
         count: result.count,
         userList
    }
}

// 添加关注
async function addFollower(userId,followerId){
     const result =  await UserRelation.create({
        userId,followerId
     })
     return result.dataValues
}
async function deleteFollower(userId,followerId){
    const result =  await UserRelation.destroy({
       where:{
         userId,
         followerId
       }
    })
    return result > 0 
}
module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower
}