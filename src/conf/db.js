const env = process.env.NODE_ENV //环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if(env == 'dev'){
  // mysql
  MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'199807052424zwq',
    port:'3306',
    database:'myblogsystom'
  }
  // redis
  REDIS_CONF = {
    prot:6379,
    host:'127.0.0.1'
  }
}

if(env == 'production'){
  // mysql
  MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'199807052424zwq',
    port:'3306',
    database:'myblogsystom'
  }
  // redis
  REDIS_CONF = {
    prot:6379,
    host:'127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}