import { z } from 'zod';
import { nanoid } from 'nanoid';
import dateSchema from './helpers/date-schema';

// const dateSchema = z.preprocess((d) => {
//   if (typeof d == 'string' || d instanceof Date) return new Date(d);
// }, z.date());

const Common = z.object({
  id: z.string().default(nanoid),
  created: dateSchema.default(() => new Date()),
  updated: z.array(dateSchema).default([]),
  description: z.string().optional(),
  metadata: z.object({}).catchall(z.any()).optional(),
});

export default Common;
