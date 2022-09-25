const seq = require('./seq')
seq.authenticate().then(()=>{
     console.log('ok')
}).catch(()=>{
     console.log('err')
})
//执行同步
seq.sync({
    force: true
}).then(()=>{
     process.exit()
})