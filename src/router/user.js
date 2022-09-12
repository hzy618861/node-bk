const {
  Login
} = require('../controller/user')
const {set} = require('../db/redis')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const getCookieExpires = () => {
   const d = new Date()
   d.setTime(d.getTime() + (24*60*60*1000))
   return d.toGMTString()
}
const handleUserRouter = async (req,res)=>{
    const method = req.method
    const path = req.path 
    if(method==='POST' && path =='/api/user/login'){
      const {username,password} = req.body
      const data = await Login(username,password)
      if(data.username){
         //设置session
         req.session.username = data.username
         req.session.realname = data.realname
         console.log('session:',req.session)
         const userId = `${Date.now()}_${Math.random()}`
         const expireTime = getCookieExpires()
         const expireTimeForRedis = 24*60*60 //单位秒 一天时间过期
         set(userId,req.session,expireTimeForRedis)
         res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly;expires=${expireTime}`)
         return new SuccessModel('登陆成功')
      }else{
         return new ErrorModel('登陆失败')
      }
      
    }

}
module.exports = handleUserRouter