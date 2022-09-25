const { User } = require('./model')
!(async () => {
    //修改
     const res = await User.update({
       nickName:'张三1'
     },{
        where:{
            nickName:'张三'
        }
     })
     console.log(res)

})()