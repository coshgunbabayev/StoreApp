import { Router } from 'express';
const router = new Router();

import {
    createStore
} from '../controllers/signup.js';

router.route('/store')
    .post(createStore);

export default router