const Errors = require('./errors/handle')
const Log = require("../classes/log.class"); /* Log */

class Result{

  constructor(){
    this.res = {};
    this.status = 400;
    this.data = {};
    this.error = {}
  }

  ok(status, data = null){
    this.status = status;
    this.data = data;

    if(this.status >= 200 && this.status <= 299){
      this.res = {
        success: true,
        data: this.data
      }
    }
  }

  fail(status, error = null){
    console.log(error)
    this.status = status;
    this.error = error;

    if(this.status >= 400 && this.status <= 599){
      this.res = {
        success: false,
        ...Errors(this.error).sendCreateUpdateError() 
      }
    }

  }

  auth(success,message){
    if(!success){
      return {			
        success: false,
        auth: false,
        token: null,
        message: message
      }
    }
  }

  registerLog(userID, action, func) {
    if(this.res){
      Log.Save(userID, action, func, this.res);
    }
  }

}

module.exports = new Result;
