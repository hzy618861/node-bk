const User = require('./User')
const Blog = require('./Blog')
const AtRelation = require('./AtRelation')
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


//一个博客多个@关系 
Blog.hasMany(AtRelation,{
    foreignKey: 'blogId'
})
module.exports = {
    User,
    Blog,
    AtRelation,
    UserRelation
}