/**
 * user model test
 */

const {User} = require('../../src/db/model/index') 

test('User 模型属性，符合预期', () => {
    //User.build 构建内存数据，不会提交数据库
     const user = User.build({
        userName:'zhangsan',
        password:"123",
        nickName:'张三',
        picture:'xx.png',
        city:'北京'
     })
     //验证属性
     expect(user.userName).toBe('zhangsan')
     expect(user.password).toBe("123")
     expect(user.nickName).toBe('张三')
     expect(user.gender).toBe(3)  //默认值3
     expect(user.picture).toBe('xx.png') 
     expect(user.city).toBe('北京') 

})