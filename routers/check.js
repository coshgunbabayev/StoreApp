import { Router } from 'express';
const router = new Router();

import {
    account
} from '../controllers/check.js';

import {
    commonAuthenticateForApi
} from '../middlewares/auth.js';

router.route('/account')
    .get(commonAuthenticateForApi, account);

export default router