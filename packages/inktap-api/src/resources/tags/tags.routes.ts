import { Router } from 'express';
import { withControllers } from '@utils';

import createTag from './create-tag';
import getMultipleTags from './get-multiple-tags';
import getTag from './get-tag';
import updateTag from './update-tag';
import deleteTag from './delete-tag';

const router = Router();

router.route('/').get(getMultipleTags).post(createTag);
router.route('/:id').delete(deleteTag).get(getTag).patch(updateTag).put(updateTag);

export default withControllers(router);
