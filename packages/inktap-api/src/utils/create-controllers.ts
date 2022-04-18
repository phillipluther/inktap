import { Router } from 'express';
import { ZodSchema } from 'zod';
import { getOne, getMany, createOne, deleteOne, updateOne } from '@src/controllers';

export default function createControllers(router: Router, Model: ZodSchema) {
  router.route('/').get(getMany(Model)).post(createOne(Model));
  router
    .route('/:id')
    .get(getOne(Model))
    .put(updateOne(Model))
    .patch(updateOne(Model))
    .delete(deleteOne(Model));

  return router;
}
