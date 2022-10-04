/**
 * @用户关系
 */
const xss = require('xss')
const { AtRelation, Blog, User } = require('../db/model/index')
const { formatUser, formatContent } = require('./_format')
async function createAtRelation(blogId, userId) {
    const res = await AtRelation.create({
        blogId, userId
    })
    return res.dataValues
}

async function getAtRelationCount(userId) {
    const res = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return res.count
}

async function getAtUserBlogList({ userId, pageIndex, pageSize }) {
    const res = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: { userId }
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })

    let blogList = res.rows.map(item => item.dataValues)
    blogList = blogList.map(item => {
        item.contentFormat = xss(formatContent(item))
        item.createdAtFormat = item.createdAt.toLocaleString()
        item.user = formatUser(item['user-new'].dataValues)
        return item
    })
    return {
        count: res.count,
        blogList: blogList
    }



}
/**
 * 
 * @param {*} newIsRead 更新内容 
 * @param {*} userId 更新条件 
 * @param {*} isRead 更新条件  
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
    const updateData = {}
    if (newIsRead) updateData.isRead = newIsRead
    const whereData = {}
    if (userId) whereData.userId = userId
    if (isRead) whereData.isRead = isRead
    const res = await AtRelation.update(updateData, {
        where: whereData
    })
    return res[0] > 0

}
module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}