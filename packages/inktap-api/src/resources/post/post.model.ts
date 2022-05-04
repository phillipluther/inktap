import { z } from 'zod';
import BaseSchema from '@src/utils/schema-helpers/base-schema';
import { createModel } from '@src/utils';
import dateSchema from '@src/utils/schema-helpers/date-schema';

export const PostSchema = BaseSchema.extend({
  published: dateSchema.optional(),
  title: z.string(),
  excerpt: z.string(),
  markdown: z.string().default(''),
  markup: z.string().optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  cover: z.string().optional(),
});

export type PostType = z.infer<typeof PostSchema>;

export default createModel(PostSchema);
