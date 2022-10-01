
const {getUserInfo} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')
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
module.exports = {
    isExist
}