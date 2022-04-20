import { z } from 'zod';
import BaseSchema from './helpers/base-schema';

const TagSchema = BaseSchema.extend({
  name: z.string(),
  description: z.string().optional(),
  related: z.array(z.string()).optional(),
}).describe('tag');

export default TagSchema;
export type TagType = z.infer<typeof TagSchema>;
