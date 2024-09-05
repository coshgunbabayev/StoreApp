import { Router } from 'express';
const router = new Router();

import {
    getSignupPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getLoginPage,
    getIndexPage,
    getDashboardPage
} from '../controllers/page.js';

import roleChecking from '../middlewares/role.js';

import {
    storeAuthenticateForPage
} from '../middlewares/auth.js';

router.route('/signup/:role')
    .get(roleChecking, getSignupPage);

router.route('/verification/code/:role/:token')
    .get(roleChecking, getVerificationCodePage);

router.route('/verification/email/:role')
    .get(roleChecking, getVerificationEmailPage);

router.route('/login/:role')
    .get(roleChecking, getLoginPage);

router.route('/')
    .get(getIndexPage);

router.route('/dashboard')
    .get(storeAuthenticateForPage, getDashboardPage);

export default router