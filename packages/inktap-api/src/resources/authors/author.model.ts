import { z } from 'zod';
import { createModel } from '@src/utils';
import BaseSchema from '@src/utils/schema-helpers/base-schema';
import socialSchema from '@src/utils/schema-helpers/social-schema';

export const AuthorSchema = BaseSchema.extend({
  username: z.string(),
  password: z.string(),
  name: z.string().optional(),
  preferredName: z.string().optional(),
  bio: z.string().optional(),
  social: z.array(socialSchema).optional(),
});

export type PostType = z.infer<typeof AuthorSchema>;

export default createModel('author', AuthorSchema);
