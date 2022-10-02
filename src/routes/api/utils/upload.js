const { saveFile } = require('../../../controller/utils')
const { loginCheck } = require('../../../middleware/loginChecks')
const koaBody = require('koa-body')
const path  = require('path')
const router = require('koa-router')()
router.prefix('/api/utils')
router.post('/upload',loginCheck, koaBody({
    multipart: true, // 支持多文件上传
    encoding: "gzip", // 编码格式
    formidable: {
      uploadDir: path.join(__dirname, "../../../public/img"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小限制
    },
  }),async (ctx, next) => {
     const file = ctx.request.files.file
     const {size,filepath,newFilename,mimetype} = file
     ctx.body = await saveFile({
        size,
        path:filepath,
        name:newFilename,
        type:mimetype
     })
})  

module.exports = router