const server = require('../server')
const {COOKIE_H} = require('../userInfo')
test('广场页第一页数据', async () => {
     const res =  await server.get(`/api/square/loadMore/0`).set('cookie',COOKIE_H)
     expect(res.body.errno).toBe(0)
     const data = res.body.data
     expect(data).toHaveProperty('isEmpty')
     expect(data).toHaveProperty('blogList')
     expect(data).toHaveProperty('pageSize')
     expect(data).toHaveProperty('pageIndex')
     expect(data).toHaveProperty('count')
})