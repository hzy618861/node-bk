const { getUsersByFollower, addFollower,deleteFollower } = require("../services/userRelation")
const {SuccessModel,ErrorModel} = require('../model/resModel')
async function getFans(userId){
    const {count,userList} = await getUsersByFollower(userId)
    return new SuccessModel({
        count,userList
    })
}
/**
 * 
 * @param {*} myId  登陆用户ID
 * @param {*} curId 被关注的用户ID
 */
async function follow(myId,curId){
    try{
         await addFollower(myId,curId)
        return new SuccessModel()
    }catch(e){
        return new ErrorModel({
             error:-1,
             message:'关注失败'
        })
    }
}
async function unFollow(myId,curId){
    const res = await deleteFollower(myId,curId)
    if(res){
        return new SuccessModel()
    }else{
        return new ErrorModel({
            error:-1,
            message:'取消关注失败'
       })
    }
    
}
module.exports = { 
    getFans,
    follow,
    unFollow
}