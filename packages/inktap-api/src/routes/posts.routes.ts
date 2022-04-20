import { Router } from 'express';
import { createControllers } from '@utils';
import Post from '@src/schemas/post.schema';

export default createControllers(Router(), Post);
