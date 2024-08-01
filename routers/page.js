import { Router } from 'express';
const router = new Router();

import {
    getStoreSignupPage,
    getStoreLoginPage,
    getUserSignupPage,
    getUserLoginPage
} from '../controllers/page.js';

router.route('/store/signup')
    .get(getStoreSignupPage);

router.route('/store/login')
    .get(getStoreLoginPage);

router.route('/user/signup')
    .get(getUserSignupPage);

router.route('/user/login')
    .get(getUserLoginPage);

export default router