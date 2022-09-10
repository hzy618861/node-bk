const {
  Login
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRoyer = (req,res)=>{
    const method = req.method
    const path = req.path 
    if(method==='POST' && path =='/api/user/login'){
      const {username,password} = req.body
      const res = Login(username,password)
      if(res){
         return new SuccessModel('登陆成功')
      }else{
         return new ErrorModel('登陆失败')
      }
      
    }
}
module.exports = handleUserRoyer