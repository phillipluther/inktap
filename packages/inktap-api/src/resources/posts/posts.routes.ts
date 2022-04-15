import { Router } from 'express';
import { withControllers } from '@utils';
import createPost from './create-post';

const router = Router();

router.route('/').post(createPost);

export default withControllers(router);
