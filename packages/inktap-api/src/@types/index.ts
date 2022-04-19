import { ZodError } from 'zod';
import { PostType } from '@src/models/post.model';
import { TagType } from '@src/models/tag.model';
import { AuthorType } from '@src/models/author.model';

export { PostType as Post } from '@src/models/post.model';
export { TagType as Tag } from '@src/models/tag.model';
export { AuthorType as Author } from '@src/models/author.model';

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
