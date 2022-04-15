import { z } from 'zod';
import CommonModel from './common.model';

const TagModel = CommonModel.extend({
  name: z.string(),
});

export default TagModel;
export type TagType = z.infer<typeof TagModel>;
