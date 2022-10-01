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
module.exports = {
    formatUser
}