import { Router } from 'express';
import getAllPosts from './controllers/get-all-posts.controller';
import getPost from './controllers/get-post.controller';
import createPost from './controllers/create-post.controller';
import deletePost from './controllers/delete-post.controller';
import updatePost from './controllers/update-post.controller';

const router = Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).delete(deletePost).put(updatePost);

export default router;
