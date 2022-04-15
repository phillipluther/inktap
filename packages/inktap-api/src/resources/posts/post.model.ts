import { z } from 'zod';

const dateSchema = z.preprocess((d) => {
  if (typeof d == 'string' || d instanceof Date) return new Date(d);
}, z.date());

const Post = z.object({
  id: z.string(),
  created: dateSchema,
  updated: z.array(dateSchema).optional(),
  published: dateSchema.optional(),
  title: z.string(),
  markdown: z.string(),
  markup: z.string().optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  cover: z.string().optional(),
  metadata: z.object({}).catchall(z.any()).optional(),
});

export default Post;
export type PostType = z.infer<typeof Post>;
