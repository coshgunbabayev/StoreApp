import { Router } from 'express';
const router = new Router();

import {
    getCategories
} from '../controllers/json.js';

router.route('/categories')
    .get(getCategories);

export default router