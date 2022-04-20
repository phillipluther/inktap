import { z } from 'zod';
import { nanoid } from 'nanoid';
import dateSchema from './date-schema';

const BaseModel = z.object({
  id: z.string().default(nanoid),
  created: dateSchema.default(() => new Date()),
  updated: z.array(dateSchema).default([]),
  metadata: z.object({}).catchall(z.any()).optional(),
});

export default BaseModel;
