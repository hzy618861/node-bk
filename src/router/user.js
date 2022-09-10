const handleUserRoyer = (req,res)=>{
    const method = req.method
    const path = req.path 
    if(method==='POST' && path =='/api/user/login'){
       return {
          msg: '登陆接口'
       }
    }
}
module.exports = handleUserRoyer