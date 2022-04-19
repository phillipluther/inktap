import { z } from 'zod';
import BaseModel from './helpers/base-model-schema';
import socialSchema from './helpers/social-schema';

const AuthorModel = BaseModel.extend({
  name: z.string(),
  social: z.array(socialSchema).optional(),
});

export default AuthorModel;
export type AuthorType = z.infer<typeof AuthorModel>;
