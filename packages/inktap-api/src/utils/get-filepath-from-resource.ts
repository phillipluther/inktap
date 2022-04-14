import path from 'path';
import { PathLike } from 'fs';
import Tag from '../resources/tags/tag.model';
import Post from '../resources/posts/post.model';
import { DATA_DIR, TAGS_DIR, POSTS_DIR, RESOURCE_SUFFIXES } from '@constants';
import { Tag as T, Post as P } from '@types';

export default function getFilepathFromResource(resource: T | P): PathLike {
  let dir = DATA_DIR;
  let suffix = '.unknown.json';

  if (Post.safeParse(resource).success) {
    dir = POSTS_DIR;
    suffix = RESOURCE_SUFFIXES.posts;
  } else if (Tag.safeParse(resource).success) {
    dir = TAGS_DIR;
    suffix = RESOURCE_SUFFIXES.tags;
  }

  return path.join(dir, `${resource.id}${suffix}`);
}
