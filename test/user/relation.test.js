/**
 * user api test
 */
 const { getFans, getFollowers } = require('../../src/controller/userRelation')
const server = require('../server')
const { USER_ID_H, USER_ID_L,USER_NAME_L,USER_NAME_H,COOKIE_L,COOKIE_H, } = require('../userInfo')
test(' 无论如何，先取消关注',async () => {
     const res =  await server.post('/api/profile/unFollow').send({userId:USER_ID_L}).set('cookie',COOKIE_H)
     expect(1).toBe(1)

})

test('H关注L应该成功',async () => {
    const res =  await server.post('/api/profile/follow').send({userId:USER_ID_L}).set('cookie',COOKIE_H)
    expect(res.body.errno).toBe(0)
    
})


test('获取L的粉丝应该有H',async () => {
    const res = await getFans(USER_ID_L)
    const {count,userList} = res.data
    const hasUserName = userList.some(item=>{
         return item.userName  == USER_NAME_H
    })
    expect(count>0).toBe(true)
    expect(hasUserName).toBe(true)
    
})

test('获取H的关注人应该有L',async () => {
    const res = await getFollowers(USER_ID_H)
    const {count,userList} = res.data
    const hasUserName = userList.some(item=>{
         return item.userName  == USER_NAME_L
    })
    expect(count>0).toBe(true)
    expect(hasUserName).toBe(true)
    
})


test('H取消关注L',async () => {
    const res =  await server.post('/api/profile/unFollow').send({userId:USER_ID_L}).set('cookie',COOKIE_H)
    expect(res.body.errno).toBe(0)
})