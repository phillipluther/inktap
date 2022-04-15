import { Router } from 'express';
import { withControllers } from '@utils';

const router = Router();

router.route('/').post((req, res, next) => {
  console.log('OK!');
  next();
});

export default withControllers(router);
