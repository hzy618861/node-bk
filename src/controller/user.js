
const {getUserInfo, createUser,deleteUser} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { doCrypto } = require('../utils/cryp')
async function isExist(userName){
      const userInfo = await getUserInfo(userName)
      if(!userInfo){
       return  new SuccessModel(userInfo)
      }else{
        return  new ErrorModel({
            errno: -1,
            message:'用户名已经存在'
        })
      }
}
/**
 * 
 * @param {string} userName  用户名
 * @param {string} password  密码
 * @param {number} gender   性别(1 男 2 女 3保密)
 */
async function register({userName,password,gender}){
    const userInfo = await getUserInfo(userName,doCrypto(password))
    if(userInfo){
        return  new ErrorModel({
            errno: -1,
            message:'用户已存在'
        })
    }else{
        try{
            await createUser({
                userName,password: doCrypto(password),gender
            })
            return new SuccessModel()
        }catch(err){
            return new ErrorModel({
                errno:-1,
                message:'注册失败'
            })
        }
    }
}
/**
 * 
 * @param {*} ctx 上下文 
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @returns 
 */
async function login(ctx,userName,password){
    //登陆成功 ctx.session.userInfo = xx
    const userInfo = await getUserInfo(userName,doCrypto(password))
    if(userInfo){
        ctx.session.userInfo = userInfo
        return new SuccessModel({
            errno:0,
            data:{
                userInfo
            },
            message:'登陆成功'
        })
    }else{
        return new ErrorModel({
            errno:-1,
            message:'用户名或密码错误'
        })
    }
}
async function deleteCurUser(userName){
   const res = await deleteUser(userName)
   if(res){
    return new SuccessModel()
   }else{
    return new ErrorModel({
        errno:-1,
        message:'删除失败'
    })
   }
}
module.exports = {
    isExist,
    register,
    login,
    deleteCurUser
}