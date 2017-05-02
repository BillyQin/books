var koa = require('koa');
var weChat = require('./wechat/auth');
var utils = require('./wechat/libs/utils');
var app = new koa();

const weChatFile = './wechat/config/config.txt';
var config = {
  'weChat': {
    appId: 'wxbc375822c4ff144e',
    appSecret: '39a6a96e7068ce05c35092819b2481c7',
    token: 'loveMovieIn20170428',
    getAccessToken: () => {
      return utils.readFileAsync(weChatFile);
    },
    saveAccessToken: (data) => {
      data = JSON.stringify(data);
      return utils.writeFileAsync(weChatFile, data);
    },
  }
}

let weChatConfig = new weChat.weChatClass(config.weChat);
app.use(weChatConfig.serverConfig(config.weChat));

app.listen(80);
