const { SuccessModel } = require("../model/resModel")

async function saveFile({name,type,size,path}){
     return new SuccessModel({
         url:`/img/${name}`
     })
}

module.exports = {
    saveFile
}