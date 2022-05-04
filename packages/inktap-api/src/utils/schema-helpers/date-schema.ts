import { z } from 'zod';

const dateSchema = z.preprocess((d) => {
  if (typeof d == 'string' || d instanceof Date) return new Date(d);
}, z.date());

export default dateSchema;
