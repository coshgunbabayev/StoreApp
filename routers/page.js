import { Router } from 'express';
const router = new Router();

import {
    getStoreSignupPage,
    getUserSignupPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getStoreLoginPage,
    getUserLoginPage
} from '../controllers/page.js';

router.route('/signup/store')
    .get(getStoreSignupPage);

router.route('/signup/user')
    .get(getUserSignupPage);

router.route('/verification/code/store')
    .get(getVerificationCodePage);

router.route('/verification/code/user')
    .get(getVerificationCodePage);

router.route('/verification/email/store')
    .get(getVerificationEmailPage);

router.route('/verification/email/user')
    .get(getVerificationEmailPage);

router.route('/login/store')
    .get(getStoreLoginPage);

router.route('/login/user')
    .get(getUserLoginPage);

export default router