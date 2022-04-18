import { ZodError } from 'zod';
import { PostType } from '@src/models/post';
import { TagType } from '@src/models/tag';

export { PostType as Post } from '@src/models/post';
export { TagType as Tag } from '@src/models/tag';

export type RequestData = {
  isValid: boolean;
  result?: SingleResource | ResourceCollection;
  error?: ZodError | string;
};

export type SingleResource = PostType | TagType;
export type ResourceCollection = SingleResource[];

export type Resource = 'tag' | 'post';
export type Resources = 'tags' | 'posts';

export type Suffixes = {
  [key in Resource | Resources]: string;
};
