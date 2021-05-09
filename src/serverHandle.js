const querystring = require('querystring')
const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')

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


exports.serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  req.path = req.url.split("?")[0]
  req.query = querystring.parse(req.url.split('?')[1])
  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if(!item){
      return 
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  });
  console.log("cookie is", req.cookie);
  getPostData(req).then(postData => {
    req.body = postData
    console.log("body数据", req.body);
    const blogPromsise = handleBlogRouter(req, res)
    if (blogPromsise) {
      blogPromsise.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return;
    }

    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(userData => {
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