const http = require('http')
const {serverHandle} = require('./serverHandle')
// 定义端口
const PORT = 9000

const serve = http.createServer(serverHandle)
serve.listen(PORT)