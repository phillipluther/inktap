import { Router } from 'express';
import { createControllers } from '@utils';
import Tag from '@src/schemas/tag.schema';

export default createControllers(Router(), Tag);
