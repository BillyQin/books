import * as koa from 'koa';
import { WeChat } from './wechat/auth';
import { readFileAsync, writeFileAsync } from './wechat/libs/utils';

const app = new koa();

const weChatFile = `${__dirname}/../config.txt`;
var config = {
  'weChat': {
    appId: 'wxbc375822c4ff144e',
    appSecret: '39a6a96e7068ce05c35092819b2481c7',
    token: 'loveMovieIn20170428',
    getAccessToken: () => {
      return readFileAsync(weChatFile,'utf-8');
    },
    saveAccessToken: (data) => {
      data = JSON.stringify(data);
      return writeFileAsync(weChatFile, data);
    },
  }
}

let weChatConfig = new WeChat(config.weChat);
app.use(weChatConfig.serverConfig(config.weChat));

app.listen(80);
