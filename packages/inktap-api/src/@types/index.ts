import { ZodError } from 'zod';
import { PostType } from '@src/schemas/post.schema';
import { TagType } from '@src/schemas/tag.schema';
import { AuthorType } from '@src/schemas/author.schema';

export { PostType as Post } from '@src/schemas/post.schema';
export { TagType as Tag } from '@src/schemas/tag.schema';
export { AuthorType as Author } from '@src/schemas/author.schema';

export type RequestData = {
  isValid: boolean;
  result?: SingleResource | ResourceCollection;
  error?: ZodError | string;
};

export type SingleResource = PostType | TagType | AuthorType;
export type ResourceCollection = SingleResource[];

export type Resource = 'tag' | 'post' | 'author';
export type Resources = 'tags' | 'posts' | 'authors';

export type Suffixes = {
  [key in Resource | Resources]: string;
};
