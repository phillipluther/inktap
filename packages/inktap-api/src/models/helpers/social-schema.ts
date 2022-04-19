import { z } from 'zod';

const socialSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  user: z.string(),
});

export default socialSchema;
