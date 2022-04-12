import { Router } from 'express';
import createTag from './controllers/create-tag.controller';
import getManyTags from './controllers/get-many-tags.controller';
import getTag from './controllers/get-tag.controller';

const router = Router();

router.route('/').get(getManyTags).post(createTag);
router.route('/:id').get(getTag);

export default router;
