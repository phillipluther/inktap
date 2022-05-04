import { ZodError } from 'zod';
import { PostType } from '@src/resources/post/post.model';
import { TagType } from '@src/resources/tag/tag.model';

export { PostType as Post };
export { TagType as Tag };

export type RequestData = {
  isValid: boolean;
  result?: SingleResource | ResourceCollection;
  error?: ZodError | string;
};

export type SingleResource = PostType | TagType;
export type ResourceCollection = SingleResource[];

export type Resource = 'tag' | 'post';
export type Resources = 'tags' | 'posts';

export type ResourceModel = {
  createOne: (data: SingleResource) => SingleResource;
  getOne: (id: string) => SingleResource | null;
  getMany: (params?: {}) => ResourceCollection;
  updateOne: (id: string, data: {}) => SingleResource | null;
  deleteOne: (id: string) => SingleResource | null;
};
