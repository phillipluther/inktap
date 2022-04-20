import { z } from 'zod';
import BaseSchema from './helpers/base-schema';
import socialSchema from './helpers/social-schema';

const AuthorSchema = BaseSchema.extend({
  name: z.string(),
  bio: z.string().optional(),
  social: z.array(socialSchema).optional(),
}).describe('author');

export default AuthorSchema;
export type AuthorType = z.infer<typeof AuthorSchema>;
