const controller = require('../controller')
import { Router } from 'koa-router';
const router = new Router();

router
    .get('/', controller.getHandle)
    .post('/', controller.postHandle)

export { router };