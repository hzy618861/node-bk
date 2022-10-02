/**
 * user api test
 */
const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}
let COOKIE = ''
test('注册用户，应该成功', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

//重复注册
test('重复注册，应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

//查询用户是否存在
test('查询用户是否存在', async () => {
    const res = await server.post('/api/user/isExist').send({ userName })
    expect(res.body.errno).not.toBe(0)
})


//json schema检测
test('json schema检测', async () => {
    const res = await server.post('/api/user/register').send({
        userName:'123',
        password:1,
        nickName:1,
        gender:'adsad'
    })
    expect(res.body.errno).not.toBe(0)
})

//登陆
test('登陆', async () => {
    const res = await server.post('/api/user/login').send({userName,password})
    expect(res.body.errno).toBe(0)

    //获取cookie
    COOKIE  = res.headers['set-cookie'].join(';')

})

//删除用户
test('删除用户', async () => {
    const res = await server.post('/api/user/delete')
    .set('cookie',COOKIE)
    expect(res.body.errno).toBe(0)
})

//再次查询用户应该不存在
test('再次查询用户应该不存在', async () => {
    const res =  await server.post('/api/user/isExist')
    .send({userName})
     expect(res.body.errno).toBe(0)
})