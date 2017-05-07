import { readFileAsync, writeFileAsync } from './libs/file';

export class Config {
  appId:string = 'wxbc375822c4ff144e';
  appSecret:string = '39a6a96e7068ce05c35092819b2481c7';
  token:string = 'loveMovieIn20170428';
  weChatFile:string = `${__dirname}/../config.txt`;

  // getAccessToken(){
  //   return readFileAsync(this.weChatFile,'utf-8');
  // }

  // saveAccessToken(data){
  //   data = JSON.stringify(data);
  //   return writeFileAsync(this.weChatFile, data);
  // }
}