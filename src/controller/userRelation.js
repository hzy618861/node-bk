const { getUsersByFollower,getFollowersByUser, addFollower,deleteFollower } = require("../services/userRelation")
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require("../services/atRelation")
const { PAGE_SIZE } = require("../config/constants")
async function getFans(userId){
    const {count,userList} = await getUsersByFollower(userId)
    return new SuccessModel({
        count,userList
    })
}
//获取关注人
async function getFollowers(userId){
  const {count,userList} = await getFollowersByUser(userId)
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
//获取at 我的微博数量
async function getAtCount(userId){
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
 }
 
 async function getAtMeBlogList(userId,pageIndex = 0){
    const res = await getAtUserBlogList({userId,pageIndex,pageSize:PAGE_SIZE})
    return new SuccessModel({
        isEmpty: res.blogList.length == 0,
        blogList: res.blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: res.count
      })
 }

 async function markAdRead(userId){
    try{
        await updateAtRelation({newIsRead: true},{userId,isRead:false})
    }catch(e){
         console.error(e)
    }
 }

module.exports = { 
    getFans,
    follow,
    unFollow,
    getFollowers,
    getAtCount,
    markAdRead,
    getAtMeBlogList
}