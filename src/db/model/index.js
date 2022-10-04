const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User,{
     foreignKey:'userId'
})
User.hasMany(Blog,{
    foreignKey:'userId'
})

UserRelation.belongsTo(User,{
     foreignKey:'followerId'
})

User.hasMany(UserRelation,{
    foreignKey:'userId'
})

Blog.belongsTo(UserRelation,{
    targetKey:'followerId',
    foreignKey: 'userId'
})
module.exports = {
    User,
    Blog,
    UserRelation
}