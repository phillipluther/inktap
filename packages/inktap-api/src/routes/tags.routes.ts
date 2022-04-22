import { Router } from 'express';
import { createControllers } from '@utils';
import TagSchema from '@src/schemas/tag.schema';

// const Tag = createModel(TagSchema);

export default createControllers(Router(), TagSchema);
