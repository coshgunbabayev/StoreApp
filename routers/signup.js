import { Router } from 'express';
const router = new Router();

import {
    createStore,
    createUser
} from '../controllers/signup.js';

router.route('/store')
    .post(createStore);

router.route('/user')
    .post(createUser);

export default router