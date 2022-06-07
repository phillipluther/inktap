import { Router } from 'express';
import login from './login';

const router = Router();
router.route('/').post(login);

export default router;
