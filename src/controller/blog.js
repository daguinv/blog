const getBlogList = (author,keyword) => {
  return [
    {
      id:1,
      title:"标题1",
      contnet:"内容1",
      createTime: 1618589018918,
      author:'zhang'
    },
    {
      id:2,
      title:"标题2",
      contnet:"内容2",
      createTime: 1618589058131,
      author:'liu'
    }
  ]     
}

const getDetail = (id) => {
  return [
    {
      id:1,
      title:"标题1",
      contnet:"内容1",
      createTime: 1618589018918,
      author:'zhang'
    },
  ]
} 

const newBlog = (blogData = {}) => {
  return {
    id:3
  }
}

const updateBlog = (id,blogData = {}) => {
  // id 更新博客的id
  // blogData 博客对象
  return true
}

const delBlog = id => {
  return true
}
module.exports = {
  getBlogList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}