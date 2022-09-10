const getList = (author,keyword) => {
     return [
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime: 1662796245421,
            author:'张三'
        },
        {
            id:2,
            title:'标题B',
            content:'内容B',
            createTime: 1662796292037,
            author:'李四'
        }
     ]
}
const getDetail = (id) => {
    return  {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime: 1662796245421,
        author:'张三'
    }
}
module.exports = {
    getList,
    getDetail
}