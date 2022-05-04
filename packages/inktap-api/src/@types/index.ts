import { SafeParseReturnType, ZodError, ZodParsedType } from 'zod';
// import { PostType } from '@src/schemas/post.schema';
import { TagType } from '@src/resources/tag/tag.model';
// import { AuthorType } from '@src/schemas/author.schema';

// export { PostType as Post } from '@src/schemas/post.schema';
export { TagType as Tag };
// export { AuthorType as Author } from '@src/schemas/author.schema';

export type RequestData = {
  isValid: boolean;
  result?: SingleResource | ResourceCollection;
  error?: ZodError | string;
};

export type SingleResource = TagType;
export type ResourceCollection = SingleResource[];

export type Resource = 'tag'; // | 'post' | 'author';
export type Resources = 'tags'; // | 'posts' | 'authors';

export type Suffixes = {
  [key in Resource | Resources]: string;
};

export type ResourceModel = {
  createOne: (data: SingleResource) => SingleResource;
  getOne: (id: string) => SingleResource | null;
  getMany: (params?: {}) => ResourceCollection;
  updateOne: (id: string, data: {}) => SingleResource | null;
  deleteOne: (id: string) => SingleResource | null;
};

export interface ResourceModelInstance extends ResourceModel {
  [key: string]: any;
}
