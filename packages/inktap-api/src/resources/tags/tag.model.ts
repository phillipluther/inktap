import { z } from 'zod';

const dateSchema = z.preprocess((d) => {
  if (typeof d == 'string' || d instanceof Date) return new Date(d);
}, z.date());

const Tag = z.object({
  id: z.string(),
  created: dateSchema,
  name: z.string(),
  updated: z.array(dateSchema).optional(),
  description: z.string().optional(),
  metadata: z.object({}).catchall(z.any()).optional(),
});

export default Tag;
export type TagType = z.infer<typeof Tag>;
