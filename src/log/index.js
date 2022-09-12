const fs = require('fs')
const path = require('path')
const fileName = path.relative(__dirname,'data.txt')
fs.readFile(fileName,(err,data)=>{
     if(err){
         console.log(err)
     }else{
         console.log(data.toString())
     }
})

const content = '新内容1'
const opt = {
     flag: 'a' //追加
}
fs.writeFile(fileName,content,opt,(err)=>{
    if(err){
        console.log(err)
    }
})