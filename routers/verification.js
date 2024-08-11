import { Router } from 'express';
const router = new Router();

import {
    verificationCode
} from '../controllers/verification.js';

import roleChecking from '../middlewares/role.js';

router.route('/code/:role')
    .post(roleChecking, verificationCode)

export default router