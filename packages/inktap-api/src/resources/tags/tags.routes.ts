import { Router } from 'express';
import { createControllers } from '@utils';
import Tag from '@src/models/tag';

export default createControllers(Router(), Tag);
