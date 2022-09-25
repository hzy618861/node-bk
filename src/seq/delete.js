const { Blog, User } = require('./model')
!(async () => {
  //删除
  // const delRes = await Blog.destroy({
  //   where: {
  //     id: 4
  //   }
  // })
  const userRes = await User.destroy({
    where: {
      id: 1
    }
  })
  // console.log(delRes)
  console.log(userRes)

  //删除失败，可以在数据库修改外键删除模式修改为级联

})()