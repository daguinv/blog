const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  if (method === 'GET' && req.path === '/api/user/login') {
    // let { username, password } = req.body
    let { username, password } = req.query
    return login(username, password).then(data => {
      if (data.username) {
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        return new SuccessModel(data)
      } else {
        return new ErrorModel("登录失败")
      }
    })

  }
  // 登录验证的测试
  if(method === 'GET' && req.path === '/api/user/login-test'){
    if(req.cookie.username){
      return Promise.resolve(new SuccessModel(req.cookie.username))
    }
    return new ErrorModel("登录失败")
  }
}

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  // 把Date对象转换成字符串
  return d.toGMTString()
}

module.exports = handleUserRouter