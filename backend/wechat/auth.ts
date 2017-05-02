import { sha1 } from 'sha1';
import { request } from 'request';

const prefix = 'https://api.weixin.qq.com/cgi-bin/';

export class WeChat {
  constructor(options) {
    this.appId = options.appId;
    this.appSecret = options.appSecret;
    this.getAccessToken = options.getAccessToken;
    this.saveAccessToken = options.saveAccessToken;

    this.getAccessToken() 
    .then(data => {
      if (this.isValidAccessToken(data)) {
        resolve(data);
      } else {
        return this.updateAccessToken(data);
      }
    })
    .then(data => {
      this.accessToken = data.access_token;
      this.expiresIn = data.expires_in;   
    })
    .catch(err=>{
      console.log(err);
    });
  }

  isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false;
    }

    let accessToken = data.access_token;
    let expiresIn = data.expires_in;
    let now = new Date().getTime();

    if (now < expiresIn) {
      return true;
    } else {
      return false;
    }
  }

  updateAccessToken() {
    let appId = this.appId;
    let appSecret = this.appSecret;
    let url = `${prefix}token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

    return new Promise((resolve, reject) => {
      request(url, (error, response) => {
        if(!error && response.statusCode === 200){
          resolve(response);
        } else {
          reject(error);
        }
      })
    })
    .then(r => {
      let data = JSON.parse(r.body);
      let now = new Date().getTime();
      let expiresIn = now + (r.body.expires_in - 20) * 1000;
      data.expires_in = expiresIn;
      this.saveAccessToken(data);
      return data;
    })
    .catch(err=>{
      console.log(err);
    });
  }

  serverConfig(options) {
    return function *(next){
      let token = options.token;
      let {signature, timestamp, nonce, echostr} = this.query;
      let strList = [token, timestamp, nonce].sort().join('');
      let sha = sha1(strList);

      if (sha === signature && this.method === 'GET') {
        this.body = echostr;
      } else if (sha === signature && this.method === 'POST') {
        console.log(this.request.body); 
      }
    } 
  }
}