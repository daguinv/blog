const login = (username,password) => {
  if(username === 'zwq' && password ==='123'){
    return true
  }
  return false
}

module.exports = {
  login
}