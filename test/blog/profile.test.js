const server = require('../server')
const {COOKIE_H,USER_NAME_H} = require('../userInfo')
test('个人主页加载第一页数据', async () => {
     const res =  await server.get(`/api/profile/loadMore/${USER_NAME_H}/0`).set('cookie',COOKIE_H)
     expect(res.body.errno).toBe(0)
     const data = res.body.data
     expect(data).toHaveProperty('isEmpty')
     expect(data).toHaveProperty('blogList')
     expect(data).toHaveProperty('pageSize')
     expect(data).toHaveProperty('pageIndex')
     expect(data).toHaveProperty('count')
})