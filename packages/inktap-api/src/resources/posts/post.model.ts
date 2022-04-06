import { z } from 'zod';

const Post = z.object({
  id: z.string(),
  published: z.date(),
  updated: z.array(z.date()).optional(),
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
export type Post = z.infer<typeof Post>;
