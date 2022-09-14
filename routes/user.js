var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  Login
} = require('../controller/user')
router.post('/login', async function(req, res, next) {
  const {username,password} = req.body
  const data = await Login(username,password)
  if(data.username){
     //设置session
     req.session.username = data.username
     req.session.realname = data.realname
     res.json(new SuccessModel('登陆成功'))
  }else{
    res.json(new ErrorModel('登陆失败'))
  }
});
router.get('/session-get', function(req, res, next) {
    if(req.session.username){
       res.json({
         errno:0,
         data: req.session
       })
    }else{
      res.json({
        errno:-1,
        msg: '登陆失败'
      })
    }
});

module.exports = router;
