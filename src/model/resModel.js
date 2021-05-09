class BaseModel {
  // 可以穿两个参数  data 传对象，message 传字符串  如果data 传字符串就不用传第二个参数(可以传一个对象，一个字符串，也可以传一个字符串)
  constructor(data ,message ){
    if(typeof data === 'string'){
      this.message = data
    }else{
      this.data  =  data 
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel{
  constructor(data,message){
    super(data,message)
    this.code = 0
    this.msg = "success"
  }
}

class ErrorModel extends BaseModel {
  constructor(data,message){
    super(data,message)
    this.code = -1
    this.msg = "error"
  }
}

module.exports = {
  SuccessModel,
  ErrorModel   
}