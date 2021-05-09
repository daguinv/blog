const {getBlogList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')


const handleBlogRouter = (req,res) => {
  const method = req.method 
  const id = req.query.id
  // 查看博客列表
  if(req.path === '/api/blog/list' && method === 'GET'){
    console.log(req.query);
    const {author,keyword} = req.query
    const listData = getBlogList(author,keyword)
    return new SuccessModel(listData)
  }
  // 查看博客内容
  if(req.path === '/api/blog/detail'  && method === 'GET'){
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
  }
  // 新增一篇博客
  if(req.path === '/api/blog/new'  && method === 'POST'){
    return new SuccessModel(newBlog(req.body))
  }
  // 更新一篇博客
  if(req.path === '/api/blog/update'  && method === 'POST'){
    return new SuccessModel(updateBlog(id,req.body))
  }
  if(req.path === '/api/blog/del'  && method === 'POST'){
    const res = delBlog(id)
    if(res){
      return new SuccessModel(res)
    }else{
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter