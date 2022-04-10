import { z } from 'zod';

const Tag = z.object({
  id: z.string(),
  created: z.date(),
  name: z.string(),
  description: z.string().optional(),
  metadata: z.object({}).catchall(z.any()).optional(),
});

export default Tag;
export type TagType = z.infer<typeof Tag>;
