import { Router } from 'express';
import { createControllers } from '@utils';
import Tag from '@src/models/tag.model';

export default createControllers(Router(), Tag);
