//用户关系
const Sequelize = require('sequelize')
const seq = require('../seq')
//创建atRelation模型
const AtRelation = seq.define('atRelation',{
    userId:{
        type: Sequelize.INTEGER,  
        allowNull: false,
        comment:"用户id"
    },
    blogId:{
        type: Sequelize.INTEGER,  
        allowNull: false,
        comment:"微博id"
    },
    isRead:{
        type: Sequelize.BOOLEAN,  
        allowNull: false,
        defaultValue: false,
        comment:"是否已读"
    },
   
});
module.exports = AtRelation