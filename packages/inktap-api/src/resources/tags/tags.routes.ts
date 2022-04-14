import { Router } from 'express';
import createTag from './controllers/create-tag.controller';
import getMultipleTags from './controllers/get-multiple-tags.controller';
import getTag from './controllers/get-tag.controller';
import updateTag from './controllers/update-tag.controller';
import deleteTag from './controllers/delete-tag.controller';

const router = Router();

router.route('/').get(getMultipleTags).post(createTag);
router.route('/:id').delete(deleteTag).get(getTag).put(updateTag);

export default router;
