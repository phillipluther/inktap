import { Router } from 'express';
import { Resources } from '@types';
import getOne from './get-one';
import getMany from './get-many';

export default function (resource: Resources) {
  const router = Router();

  router.route('/').get(getMany(resource));
  router.route('/:id').get(getOne(resource));

  return router;
}
