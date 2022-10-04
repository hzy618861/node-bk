//数据格式化

function _formatUserPicture(obj){
     if(!obj.picture){
        obj.picture = 'xx'
     }
     return obj
}
function formatUser(list){   // Array || object
    if(!list) return
    if(Array.isArray(list)){
       return list.map(_formatUserPicture)
    }else{
       return _formatUserPicture(list)
    }
}
function formatContent(obj){
     obj.contentFormat = obj.content
     // @张三 - zhangsan  xxx => <a href="/profile/zhangsan">张三</a> xxx
     obj.contentFormat = obj.contentFormat.replace(/@(.+?)\s-\s(\w+?)\b/g,(matchStr,nickName,userName)=>{
        return `<a href="/profile/${userName}">@${nickName}</a>`
     })
     return obj.contentFormat
}
module.exports = {
    formatUser,
    formatContent
}