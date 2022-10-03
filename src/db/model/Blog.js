const Sequelize = require('sequelize')
const seq = require('../seq')
//创建User模型
const Blog = seq.define('blog-new',{
    //id会自动创建，并设为主键盘，自增   还会自动增加createAt updateAt 字段
    content:{
        type: Sequelize.TEXT,  // varchar(255)
        allowNull: false,
        comment:"微博内容"
    },
    image:{
        type: Sequelize.STRING,  // varchar(255)
        comment:"微博图片"
    },
    userId:{
        type: Sequelize.INTEGER,  // varchar(255)
        allowNull: false,
        comment: '用户ID'
    },
});
module.exports = Blog