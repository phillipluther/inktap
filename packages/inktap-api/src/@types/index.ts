export { PostType as Post } from '@src/models/post.model';
export { TagType as Tag } from '@src/models/tag.model';

export type Resource = 'tag' | 'post';
export type Resources = 'tags' | 'posts';

export type Suffixes = {
  [key in Resource | Resources]: string;
};
