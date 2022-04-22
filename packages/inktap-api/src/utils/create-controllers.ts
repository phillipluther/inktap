import { Router } from 'express';
import { ZodSchema } from 'zod';
import { getOne, getMany, createOne, deleteOne, updateOne } from '@src/controllers';

export default function createControllers(router: Router, Schema: ZodSchema) {
  router.route('/').get(getMany(Schema)).post(createOne(Schema));
  router
    .route('/:id')
    .get(getOne(Schema))
    .put(updateOne(Schema))
    .patch(updateOne(Schema))
    .delete(deleteOne(Schema));

  return router;
}
