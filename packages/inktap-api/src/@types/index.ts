export { PostType as Post } from '../resources/posts/post.model';
export { TagType as Tag } from '../resources/tags/tag.model';

export enum Resources {
  TAG = 'tags',
  POST = 'posts',
}

export type Suffixes = {
  [key in Resources]: string;
};
