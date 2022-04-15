import { Router } from 'express';
import { getOne, getMany, createOne, deleteOne, updateOne } from '@src/controllers';

export default function withControllers(router: Router) {
  router.route('/').get(getMany).post(createOne);
  router.route('/:id').get(getOne).put(updateOne).patch(updateOne).delete(deleteOne);

  return router;
}
