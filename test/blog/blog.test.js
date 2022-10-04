const server = require('../server')
const {COOKIE_H} = require('../userInfo')
let  BLOG_ID
test('创建微博', async () => {
     const content = '测试微博内容_'+ Date.now()
     const image = '/xxx.png'
     const res =  await server.post('/api/blog/create').set('cookie',COOKIE_H).send({
        content,
        image
     })
     BLOG_ID = res.body.data.id
     expect(res.body.errno).toBe(0)
     expect(res.body.data.content).toBe(content)
     expect(res.body.data.image).toBe(image)
})