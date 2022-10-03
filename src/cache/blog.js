const { get, set } = require('./_redis')
const  {getBlogListByUser} = require('../services/blog')


const KEY_PREFIX = 'weibo:square:'

async function getSquareCacheList(pageIndex,pageSize){
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
    //尝试获取缓存
    const cacheResult = await get(key)
    if(cacheResult){
         return cacheResult
    }
    //没有缓存读取数据库
    const result = await getBlogListByUser({pageIndex,pageSize})
    //设置缓存
    set(key,result,60)
    return result
}

module.exports = { 
    getSquareCacheList
}