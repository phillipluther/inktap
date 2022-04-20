import { Router } from 'express';
import { createControllers } from '@utils';
import Author from '@src/schemas/author.schema';

export default createControllers(Router(), Author);
