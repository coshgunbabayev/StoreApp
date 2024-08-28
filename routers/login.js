import { Router } from 'express';
const router = new Router();

import {
    loginStore,
    loginUser
} from '../controllers/login.js';

import {
    resetAuthCookies
} from '../middlewares/cookies.js';

router.route('/store')
    .post(resetAuthCookies, loginStore);

router.route('/user')
    .post(resetAuthCookies, loginUser);

export default router