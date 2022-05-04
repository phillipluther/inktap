import { Router } from 'express';
import Post from './post.model';
import { createControllers } from '@src/utils';

const router = Router();
const controllers = createControllers(Post);

router.route('/').post(controllers.createOne).get(controllers.getMany);
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);

export default router;
