const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {set} = require('../db/redis')

// 登录
const handleUserRouter = (req, res) => {
  const method = req.method
  if (method === 'GET' && req.path === '/api/user/login') {
    // let { username, password } = req.body
    let { username, password } = req.query
    return login(username, password).then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        // 将设置的session同步到redis中
        set(req.sessionId,req.session)
        return new SuccessModel(data)
      } else {
        return new ErrorModel("登录失败")
      }
    })

  }
  // 登录验证的测试
  if(method === 'GET' && req.path === '/api/user/login-test'){
    console.log(req.session);
    if(req.session.username){
      return Promise.resolve(new SuccessModel(req.session))
    }
    return Promise.resolve(new ErrorModel("尚未登录"))
  }
}

module.exports = handleUserRouter