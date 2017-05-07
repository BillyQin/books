import * as koa from 'koa';
import * as Router from 'koa-router';
import { WeChat, Auth } from './wechat/auth';

import { Config } from './wechat/config';
let app = new koa();
let router = new Router();

router.get('/', Auth());
app.use(new WeChat(Config));

app.listen(80);