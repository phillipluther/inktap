import { Router } from 'express';
import { createControllers } from '@utils';
import Author from '@src/models/author.model';

export default createControllers(Router(), Author);
