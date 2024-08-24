import { Router } from 'express';
const router = new Router();

import {
    verificationCode,
    verificationEmail
} from '../controllers/verification.js';

import roleChecking from '../middlewares/role.js';

router.route('/code/:role/:token')
    .post(roleChecking, verificationCode);

router.route('/email/:role')
    .post(roleChecking, verificationEmail);

export default router