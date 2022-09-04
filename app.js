const serverHandle = (req,res) => {
    res.setHeader('Content-type','application/json')  //指定返回字符串格式
    const resData = {
         name:"测试",
         site:'immoc',
         env:process.env.NODE_ENV
    }
    res.end(JSON.stringify(resData))
}
module.exports = serverHandle