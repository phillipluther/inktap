import { z } from 'zod';
import BaseModel from './helpers/base-model-schema';
import socialSchema from './helpers/social-schema';

const AuthorModel = BaseModel.extend({
  name: z.string(),
  bio: z.string().optional(),
  social: z.array(socialSchema).optional(),
}).describe('author');

export default AuthorModel;
export type AuthorType = z.infer<typeof AuthorModel>;
