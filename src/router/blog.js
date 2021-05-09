const { getBlogList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // 查看博客列表
  if (req.path === '/api/blog/list' && method === 'GET') {
    console.log(req.query);
    const { author, keyword } = req.query
    return getBlogList(author, keyword).then( listData => {
      return new SuccessModel(listData)
    })
  }
  // 查看博客内容
  if (req.path === '/api/blog/detail' && method === 'GET') {
    return getDetail(id).then( detailData => {
      return new SuccessModel(detailData)
    })
  }
  // 新增一篇博客
  if (req.path === '/api/blog/new' && method === 'POST') {
    req.body.author = 'xinxin' //假数据，待代发登录时在改成真是数据
    return newBlog(req.body).then( data => {
      return new SuccessModel(data)
    })
  }
  // 更新一篇博客
  if (req.path === '/api/blog/update' && method === 'POST') {
    return updateBlog(id,req.body).then( data => {
      if(data){
        return new SuccessModel()
      }else{
        return new ErrorModel('更新博客失败')
      }
    })
  }
  if (req.path === '/api/blog/del' && method === 'POST') {
    let author = 'xinxin'
    return delBlog(id,author).then( data => {
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
    
  }
}

module.exports = handleBlogRouter