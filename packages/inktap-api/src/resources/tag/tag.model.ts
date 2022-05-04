import { z } from 'zod';
import BaseSchema from '@src/utils/schema-helpers/base-schema';
import { createModel } from '@src/utils';

export const TagSchema = BaseSchema.extend({
  name: z.string(),
  description: z.string().optional(),
  related: z.array(z.string()).optional(),
});

export type TagType = z.infer<typeof TagSchema>;

export default createModel(TagSchema);
