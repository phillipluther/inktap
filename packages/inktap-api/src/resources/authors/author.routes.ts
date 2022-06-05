import { Router } from 'express';
import Author from './author.model';
import { createControllers } from '@src/utils';

const router = Router();
const controllers = createControllers(Author);

router.route('/').post(controllers.createOne).get(controllers.getMany);
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);

export default router;
