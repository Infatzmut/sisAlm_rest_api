'use strict'
const fs = require('fs');
const path = require('path')

function errorLogger(message) {
    const date = new Date().toLocaleTimeString(undefined, {
        hour : '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    const fullmessage = `${message} ${date} \n`;

    setTimeout(()=>fs.appendFile(
        path.join(__dirname, '../../access.log'), fullmessage, (err) => {
        if (err) {
            throw err;
        }
    }), 200)
}

class baseController {
    constructor() {
      this.successStatus =  'OK';
      this.errorStatus = 'ERROR';
      this.responseData = {
        status: '',
        data: {},
        message: ''
      };
    }
  
  
    getSuccessResponse(data, message) {
      this.responseData.status = this.successStatus;
      this.responseData.data = data;
      this.responseData.message = message;
      return this.responseData;
    }
  
    getErrorResponse(message) {
      this.responseData.status = this.errorStatus;
      this.responseData.data = {};
      this.responseData.message = message;
      errorLogger(message);
      return this.responseData;
    }
  }
  
  module.exports = baseController;