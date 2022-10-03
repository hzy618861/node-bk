/**
 * user model test
 */

const {Blog} = require('../../src/db/model/index') 

test('Blog 模型属性，符合预期', () => {
    //User.build 构建内存数据，不会提交数据库
     const user = Blog.build({
        userId:1,
        content:"123",
        image:'/test.png',
     })
     //验证属性
     expect(user.userId).toBe(1)
     expect(user.content).toBe("123")
     expect(user.image).toBe("/test.png")
})