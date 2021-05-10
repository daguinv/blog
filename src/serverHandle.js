const querystring = require('querystring')
const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')
const {get,set} = require('./db/redis')

// session 数据
// const SESSION_DATA = {}

// 处理post data数据
const getPostData = async (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
      } else {
        resolve(JSON.parse(postData))
      }
    })
  })
}

// 设置cookie失效时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  // 把Date对象转换成字符串
  return d.toGMTString()
}

exports.serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  req.path = req.url.split("?")[0]
  req.query = querystring.parse(req.url.split('?')[1])
  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  });

  // 处理session
  let needSetCookie = false;
  let userId = req.cookie.userId
  if(!userId){
    needSetCookie = true
    userId = Date.now() + Math.random() + "";
    set(userId,{})
  }
  req.sessionId = userId
  get(req.sessionId).then( sessionData => {
    if(sessionData == null){
      set(req.sessionId,{})
      req.session = {}
    }else{
      req.session = sessionData
    }
    console.log("req.session",req.session);
    return getPostData(req)
  }) .then(postData => {
    req.body = postData
    console.log("body数据", req.body);
    const blogPromsise = handleBlogRouter(req, res)
    if (blogPromsise) {
      blogPromsise.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return;
    }

    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return;
    }

    // 未命中路由返回404
    res.writeHead(404, { "Content-type": "text/plain" })
    res.write("404 Not Found\n")
    res.end()
  })

}