import { z } from 'zod';
import CommonModel from './common.model';
import dateSchema from './helpers/date-schema';

const PostModel = CommonModel.extend({
  published: dateSchema.optional(),
  title: z.string(),
  markdown: z.string().default(''),
  markup: z.string().optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  cover: z.string().optional(),
});

export default PostModel;
export type PostType = z.infer<typeof PostModel>;
