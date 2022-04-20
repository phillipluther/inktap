import { z } from 'zod';
import BaseSchema from './helpers/base-schema';
import dateSchema from './helpers/date-schema';

const PostSchema = BaseSchema.extend({
  published: dateSchema.optional(),
  title: z.string(),
  excerpt: z.string(),
  markdown: z.string().default(''),
  markup: z.string().optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  cover: z.string().optional(),
}).describe('post');

export default PostSchema;
export type PostType = z.infer<typeof PostSchema>;
