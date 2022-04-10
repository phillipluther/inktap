export { PostType as Post } from '../resources/posts/post.model';
export { TagType as Tag } from '../resources/tags/tag.model';

export type Resources = 'posts' | 'tags';

export type Suffixes = {
  [key in Resources]: string;
};
