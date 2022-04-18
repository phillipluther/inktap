import { Router } from 'express';
import { createControllers } from '@utils';
import Post from '@src/models/post';

export default createControllers(Router(), Post);
