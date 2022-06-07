import { z } from 'zod';
import { createModel, hash } from '@src/utils';
import BaseSchema from '@src/utils/schema-helpers/base-schema';
import socialSchema from '@src/utils/schema-helpers/social-schema';

export const UserSchema = BaseSchema.extend({
  email: z.string(),
  password: z.string().transform(hash),
  name: z.string().optional(),
  preferredName: z.string().optional(),
  bio: z.string().optional(),
  social: z.array(socialSchema).optional(),
});

export type PostType = z.infer<typeof UserSchema>;

export default createModel('user', UserSchema);
