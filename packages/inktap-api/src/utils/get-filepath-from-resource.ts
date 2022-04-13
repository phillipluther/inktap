import path from 'path';
import Tag from '../resources/tags/tag.model';
import Post from '../resources/posts/post.model';
import { TAGS_DIR, POSTS_DIR, RESOURCE_FILE_SUFFIXES } from '@constants';
import { Tag as T, Post as P } from '@types';

export default function getFilepathFromResource(resource: T | P): string | null {
  let dir;
  let suffix;

  if (Post.safeParse(resource).success) {
    dir = POSTS_DIR;
    suffix = RESOURCE_FILE_SUFFIXES.posts;
  } else if (Tag.safeParse(resource).success) {
    dir = TAGS_DIR;
    suffix = RESOURCE_FILE_SUFFIXES.tags;
  } else {
    return null;
  }

  return path.join(dir, `${resource.id}${suffix}`);
}
