const Sequelize = require('sequelize')
const seq = require('./sequelize')
//创建User模型
const User = seq.define('user-new',{
    //id会自动创建，并设为主键盘，自增   还会自动增加createAt updateAt 字段
    userName:{
        type: Sequelize.STRING,  // varchar(255)
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,  // varchar(255)
        allowNull: false
    },
    nickName:{
        type: Sequelize.STRING,  // varchar(255)
        comment: '昵称'
    }
});

//创建Blog模型
const Blog = seq.define('blog-new',{
    //id会自动创建，并设为主键盘，自增   还会自动增加createAt updateAt 字段
    title:{
        type: Sequelize.STRING,  // varchar(255)
        allowNull: false
    },
    content:{
        type: Sequelize.TEXT,  // text
        allowNull: false
    },
    userId:{
        type: Sequelize.INTEGER,  // int
        allowNull: false
    }
});
//外键关联方式一  查询可以通过blog带上user
Blog.belongsTo(User,{   
    // Blog.userId -> User.id
    foreignKey:'userId'
})
//外键关联方式二  查询可以通过user带上blog
User.hasMany(Blog,{
    // Blog.userId -> User.id
    foreignKey:'userId'
})
module.exports = {
    User,
    Blog
}