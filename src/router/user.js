const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  if (method === 'POST' && req.path === '/api/user/login') {
    let { username, password } = req.body
    return login(username, password).then(res => {
      if (res.username) {
        return new SuccessModel(res)
      } else {
        return new ErrorModel("登录失败")
      }
    })

  }
}
module.exports = handleUserRouter