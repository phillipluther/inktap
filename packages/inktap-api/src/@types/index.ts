export { PostType as Post } from '../resources/posts/post.model';
export { TagType as Tag } from '../resources/tags/tag.model';

export type Resource = 'tag' | 'post';
export type Resources = 'tags' | 'posts';

export type Suffixes = {
  [key in Resource | Resources]: string;
};
