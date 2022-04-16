import { Router } from 'express';
import { withControllers } from '@utils';

import createPost from './create-post';
import getPost from './get-post';
import getMultiplePosts from './get-multiple-posts';
import deletePost from './delete-post';
import updatePost from './update-post';

const router = Router();

router.route('/').get(getMultiplePosts).post(createPost);
router.route('/:id').delete(deletePost).get(getPost).patch(updatePost).put(updatePost);

export default withControllers(router);
