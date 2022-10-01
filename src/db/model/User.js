const Sequelize = require('sequelize')
const seq = require('../seq')
//创建User模型
const User = seq.define('user-new',{
    //id会自动创建，并设为主键盘，自增   还会自动增加createAt updateAt 字段
    userName:{
        type: Sequelize.STRING,  // varchar(255)
        allowNull: false,
        unique: true,  //唯一
        comment:"用户名"
    },
    password:{
        type: Sequelize.STRING,  // varchar(255)
        allowNull: false,
        comment:"密码"
    },
    nickName:{
        type: Sequelize.STRING,  // varchar(255)
        allowNull: false,
        comment: '昵称'
    },
    gender:{
        type: Sequelize.DECIMAL,  
        allowNull: false,
        defaultValue: 3,
        comment: '性别 (1 男性 2 女性 3 保密)'
    },
    picture: {
        type:  Sequelize.STRING,
        comment: '图片地址'
    },
    city: {
        type:  Sequelize.STRING,
        comment: '城市'
    }
});
module.exports = User