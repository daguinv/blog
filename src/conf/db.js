const env = process.env.NODE_ENV //环境参数

// 配置
let MYSQL_CONF

if(env == 'dev'){
  MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'199807052424zwq',
    port:'3306',
    database:'myblogsystom'
  }
}

if(env = 'production'){
  MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'199807052424zwq',
    port:'3306',
    database:'myblogsystom'
  }
}

module.exports = {
  MYSQL_CONF
}