import { Router } from 'express';
const router = new Router();

import {
    getSignupPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getLoginPage
} from '../controllers/page.js';

import {
    pageRole
} from '../middlewares/role.js';

router.route('/signup/:role')
    .get(pageRole, getSignupPage);

router.route('/verification/code/:role')
    .get(pageRole, getVerificationCodePage);

router.route('/verification/email/:role')
    .get(pageRole, getVerificationEmailPage);

router.route('/login/:role')
    .get(pageRole, getLoginPage);

export default router