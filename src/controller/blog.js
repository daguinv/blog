const { exec } = require('../db/mysql')
const getBlogList = (author, keyword) => {
  // 使用where进行容错，当author和keyword 都为空时 直接拼接order by 不会报错
  let sql = `select * from blogs where 1=1`
  if (author) {
    sql += ` and author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ` order by createtime desc;`
  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then( rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const {title,content,author}  = blogData
  const createtime = Date.now()
  let sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}')`
  return exec(sql).then( insertData => {
    console.log(insertData);
    return {
      id:insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id 更新博客的id
  // blogData 博客对象
  const {title,content} = blogData
  let sql = `update blogs set title='${title}', content='${content}' where id='${id}';`
  return exec(sql).then( updateData => {
    if(updateData.affectedRows > 0){
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  let sql = `delete from blogs where id='${id}' and author='${author}';`
  return exec(sql).then(deleteData => {
    if(deleteData.affectedRows > 0){
      return true
    }
    return false
  })
}
module.exports = {
  getBlogList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}