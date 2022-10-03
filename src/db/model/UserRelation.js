//用户关系
const Sequelize = require('sequelize')
const seq = require('../seq')
//创建User模型
const UserRelation = seq.define('UserRelation',{
    //id会自动创建，并设为主键盘，自增   还会自动增加createAt updateAt 字段
    userId:{
        type: Sequelize.INTEGER,  
        allowNull: false,
        comment:"用户id"
    },
    followerId:{
        type: Sequelize.INTEGER,  
        allowNull: false,
        comment:"被关注用户id"
    },
   
});
module.exports = UserRelation