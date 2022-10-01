/**
 * json schema 验证中间件
 */

const { ErrorModel } = require("../model/resModel")

function genValidator(validateFn){
    async function validate(ctx,next) {
       const error = validateFn(ctx.request.body)
       if(!error)  {
        await next()
       }else{
          ctx.body = new ErrorModel({
             errno:-1,
             message: error
          })
       }

    }
    return validate
}
module.exports = { 
    genValidator
}