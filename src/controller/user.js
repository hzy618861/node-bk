
const {getUserInfo, createUser} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { doCrypto } = require('../utils/cryp')
async function isExist(userName){
      const userInfo = await getUserInfo(userName)
      if(userInfo){
       return  new SuccessModel(userInfo)
      }else{
        return  new ErrorModel({
            errno: -1,
            message:'用户名不存在'
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
    const userInfo = await getUserInfo(userName,password)
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
module.exports = {
    isExist,
    register
}