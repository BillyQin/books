import * as sha1 from 'sha1';
import * as request from 'request';
import * as getRawBody from 'raw-body';
import * as contentType  from 'content-type';
import { parseString } from 'xml2js';


const prefix = 'https://api.weixin.qq.com/cgi-bin/';

export class WeChat {
  appId: any;
  appSecret: any;
  getAccessToken: any;
  saveAccessToken: any;
  accessToken: any = '';
  expiresIn: any = '';

  constructor(config) {
    this.appId = config.appId;
    this.appSecret = config.appSecret;
    this.getAccessToken = readFileAsync;
    this.saveAccessToken = writeFileAsync;

    this.getAccessToken()
    .then(value => {
      let data = JSON.parse(value);
      if (this.isValidAccessToken(data)) {
        return data;
      } else {
        return this.updateAccessToken();
      }
    })
    .then((data:any) => {
      this.accessToken = data.access_token;
      this.expiresIn = data.expires_in;
    })
    .then(()=>{
      let url = `${prefix}get_current_autoreply_info?access_token=${this.accessToken}`

      return new Promise((resolve, reject) => {
        request(url, (error, response) => {
          if(!error && response.statusCode === 200){
            resolve(response.body);
          } else {
            reject(error);
          }
        })
      })
    })
    .catch(err=>{
      console.log(err);
    });
  }

  isValidAccessToken(data:any) {
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
    let url = `${prefix}token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`;

    return new Promise((resolve, reject) => {
      request(url, (error, response) => {
        if(!error && response.statusCode === 200){
          resolve(response);
        } else {
          reject(error);
        }
      })
    })
    .then((response:any) => {
      let data = JSON.parse(response.body);
      let now = new Date().getTime();
      let expiresIn = now + (data.expires_in - 20) * 1000;
      data.expires_in = expiresIn;
      this.saveAccessToken(data);
      return data;
    })
    .catch(err=>{
      console.log(err);
    });
  }


  // serverConfig(Config) {
  //   return async (ctx, next)=>{
  //     let token = Config.token;
  //     let {signature, timestamp, nonce, echostr} = ctx.query;
  //     let strList = [token, timestamp, nonce].sort().join('');
  //     let sha = sha1(strList);

  //     if (sha === signature && ctx.method === 'GET') {
  //       ctx.body = echostr;
  //     } else if (sha === signature && ctx.method === 'POST') {
  //         let buffer = await getRawBody(ctx.req, {
  //           length: ctx.req.headers['content-length'],
  //           limit: '1mb',
  //           encoding: contentType.parse(ctx.req).parameters.charset
  //         });

  //         await function(buffer){
  //           let xml = buffer.toString();
  //           console.log(xml);
  //           return new Promise((resolve, reject)=>{
  //             parseString(xml, (err, result)=>{
  //               if(err){
  //                 reject;
  //               } else {
  //                 resolve(result.xml);
  //               }
  //             })
  //           })
  //           .then((data:any)=>{
  //             console.log("zfdsfsdfdsffdasfas\n");
  //             let message =
  //             `<xml>
  //               <ToUserName><![CDATA[${data.ToUserName[0]}]]></ToUserName>
  //               <FromUserName><![CDATA[${data.FromUserName[0]}]]></FromUserName>
  //               <CreateTime>${Date.now()}</CreateTime>
  //               <MsgType><![CDATA[${data.MsgType[0]}]]></MsgType>
  //               <Content><![CDATA[你好]]></Content>
  //             </xml>`.replace(/[\r\n\s+]/g,'').trim();
  //             console.log(message);
  //             // ctx.response.state = 200;
  //             // ctx.response.body = message;
  //             ctx.res.setHeader('Content-Type', 'application/xml');
  //             ctx.res.end(message);
  //           });
  //         };
  //       };
  //   }
  //     // ctx.response.state = 200;
  //     // ctx.response.body = '';
  // }
}

export function Auth(){
  //let token = Config.token;
  let token = 'dsfs';
  return async (ctx, next)=>{
    let {signature, timestamp, nonce, echostr} = ctx.query;
    let strList = [token, timestamp, nonce].sort().join('');
    let sha = sha1(strList);
    console.log('auth');
    if (sha === signature) {
      ctx.body = echostr;
    }
    next();
  }
}

  // serverConfig(options) {
  //   return async (ctx, next)=>{
  //     let token = options.token;
  //     let {signature, timestamp, nonce, echostr} = ctx.query;
  //     let strList = [token, timestamp, nonce].sort().join('');
  //     let sha = sha1(strList);

  //     if (sha === signature && ctx.method === 'GET') {
  //       ctx.body = echostr;
  //     } else if (sha === signature && ctx.method === 'POST') {
  //         let buffer = await getRawBody(ctx.req, {
  //           length: ctx.req.headers['content-length'],
  //           limit: '1mb',
  //           encoding: contentType.parse(ctx.req).parameters.charset
  //         });

  //         await function(buffer){
  //           let xml = buffer.toString();
  //           console.log(xml);
  //           return new Promise((resolve, reject)=>{
  //             parseString(xml, (err, result)=>{
  //               if(err){
  //                 reject;
  //               } else {
  //                 resolve(result.xml);
  //               }
  //             })
  //           })
  //           .then((data:any)=>{
  //             console.log("zfdsfsdfdsffdasfas\n");
  //             let message =
  //             `<xml>
  //               <ToUserName><![CDATA[${data.ToUserName[0]}]]></ToUserName>
  //               <FromUserName><![CDATA[${data.FromUserName[0]}]]></FromUserName>
  //               <CreateTime>${Date.now()}</CreateTime>
  //               <MsgType><![CDATA[${data.MsgType[0]}]]></MsgType>
  //               <Content><![CDATA[你好]]></Content>
  //             </xml>`.replace(/[\r\n\s+]/g,'').trim();
  //             console.log(message);
  //             // ctx.response.state = 200;
  //             // ctx.response.body = message;
  //             ctx.res.setHeader('Content-Type', 'application/xml');
  //             ctx.res.end(message);
  //           });
  //         };
  //       };
  //   }
  //     // ctx.response.state = 200;
  //     // ctx.response.body = '';

  // }
}