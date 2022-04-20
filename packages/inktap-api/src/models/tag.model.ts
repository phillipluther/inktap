import { z } from 'zod';
import BaseModel from './helpers/base-model-schema';

const TagModel = BaseModel.extend({
  name: z.string(),
  description: z.string().optional(),
  related: z.array(z.string()).optional(),
}).describe('tag');

export default TagModel;
export type TagType = z.infer<typeof TagModel>;
