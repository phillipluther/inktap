import { z } from 'zod';

const socialSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  username: z.string(),
});

export default socialSchema;
