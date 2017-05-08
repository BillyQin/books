import * as koa from 'koa';
import * as Router from 'koa-router';
import { WeChat, Auth } from './wechat/auth';


let app = new koa();
let router = new Router();
let weChat = new WeChat();

router.get('/', Auth());
//app.use(new WeChat(Config));

app.listen(80);