import { Router } from 'express';
const router = new Router();

import {
    getSignupPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getLoginPage
} from '../controllers/page.js';

import roleChecking from '../middlewares/role.js';

router.route('/signup/:role')
    .get(roleChecking, getSignupPage);

router.route('/verification/code/:role')
    .get(roleChecking, getVerificationCodePage);

router.route('/verification/email/:role')
    .get(roleChecking, getVerificationEmailPage);

router.route('/login/:role')
    .get(roleChecking, getLoginPage);

export default router