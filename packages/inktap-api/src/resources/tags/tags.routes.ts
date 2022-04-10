import { Router } from 'express';
import createTag from './controllers/create-tag.controller';
import getOne from '@src/middleware/get-one';
import getMany from '@src/middleware/get-many';
import getManyTags from './controllers/get-many-tags.controller';
import getOneTag from './controllers/get-tag.controller';

const router = Router();

router.route('/').get(getMany('tags')).get(getManyTags).post(createTag);
router.route('/:id').get(getOne('tags')).get(getOneTag);

export default router;
