import * as koa from 'koa';
import * as Router from 'koa-router';
import { WeChat, Auth } from './wechat/auth';

let app = new koa();
let router = new Router();
let weChat = new WeChat();

//router.get('/', Auth());
//app.use(new WeChat(Config));
router.get('/', (ctx, next)=>{
	console.log(ctx.query);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80);