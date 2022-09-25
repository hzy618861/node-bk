const { Blog, User } = require('./model')
!(async () => {
    //查询一条记录
     const zhangsan = await User.findOne({
        where:{
            userName:'zhangsan'
        }
     })
     console.log(zhangsan.dataValues)
     //查询特定列
     const zhangsan02 = await User.findOne({
        attributes:['userName','nickName'],
        where:{
            userName:'zhangsan'
        }
     })
     console.log(zhangsan02.dataValues)
     //查询数组
     const zhangsanBlogs = await Blog.findAll({
        where:{
            userId:1
        },
        order:[
            ['id','desc']
        ]
     })
     console.log(zhangsanBlogs.map(blog=> blog.dataValues))
     //分页
     const blogList = await Blog.findAll({
         limit:2,  //限制本次查询两条
         offset:0,  //跳过多少条
         order:[
            ['id','desc']
        ]
     })
     console.log('blogList:',blogList.map(blog=> blog.dataValues))
     //查询总数
     const blogListANDCOUNT = await Blog.findAndCountAll({
        limit:2,  //限制本次查询两条
        offset:2,  //跳过多少条
        order:[
           ['id','desc']
       ]
    })
    console.log('blogListANDCOUNT:',blogListANDCOUNT.count,blogListANDCOUNT.rows.map(blog=> blog.dataValues))


    //连表查询
    const blogListWidthUser = await Blog.findAndCountAll({
        order:[
            ['id','desc']
        ],
        include:[
            {
                model: User,
                attributes:['userNAme','nickName'],
                where:{
                    userName:'zhangsan'
                }
            }
        ]
    })
    console.log('blogListWidthUser:',blogListWidthUser.rows.map(blog=> {
        const blogVal = blog.dataValues
        blogVal['user-new'] = blogVal['user-new'].dataValues
        return blogVal
    }))

     //连表查询2
     const userListWidthBlogs = await User.findAndCountAll({
        attributes:['userNAme','nickName'],
        include:[
            {
                model: Blog
            }
        ]
    })
    console.log('userListWidthBlogs:',JSON.stringify(userListWidthBlogs.rows.map(user=> {
        const userVal = user.dataValues
        userVal['blog-news'] = userVal['blog-news'].map(item=>item.dataValues)
        return userVal
    })))
})()