const { Blog, User } = require('./model')
!(async () => {
    const zhangsan = await User.create({
        userName:'zhangsan',
        password:'123',
        nickName:'张三'
    })
    const lisi = await User.create({
        userName:'lisi',
        password:'123',
        nickName:'李四'
    })
    console.log(zhangsan.dataValues)
    const blog = await Blog.create({
        title:'博客1',
        content:'123',
        userId:zhangsan.id
    })
    const blog2 = await Blog.create({
        title:'博客2',
        content:'123456',
        userId:zhangsan.id
    })
    const blog3 = await Blog.create({
        title:'博客3',
        content:'123456',
        userId:lisi.id
    })
    const blog4 = await Blog.create({
        title:'博客4',
        content:'123456',
        userId:lisi.id
    })
    console.log(blog.dataValues)
})()