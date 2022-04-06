import { Router } from 'express';
import getAllPosts from './controllers/get-all-posts.controller';
import getPost from './controllers/get-post.controller';
import createPost from './controllers/create-post.controller';

const router = Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost);

export default router;
