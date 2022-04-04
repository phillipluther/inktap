import { Router } from 'express';
import createPost from './create-post.controller';

const router = Router();

router.route('/').post(createPost);

export default router;
