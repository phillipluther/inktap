import path from 'path';
import { Resource } from '@types';

export const SRC_DIR = path.join(process.cwd(), 'src');
export const DATA_DIR =
  process.env.NODE_ENV === 'test' ? '/test/data' : path.join(process.cwd(), 'data');

export const POSTS_DIR = path.join(DATA_DIR, 'posts');
export const TAGS_DIR = path.join(DATA_DIR, 'tags');
export const AUTHORS_DIR = path.join(DATA_DIR, 'authors');

export const RESOURCE_DIRS = {
  tag: TAGS_DIR,
  tags: TAGS_DIR,
  post: POSTS_DIR,
  posts: POSTS_DIR,
  author: AUTHORS_DIR,
  authors: AUTHORS_DIR,
};

export const RESOURCE_BY_ROUTE: { [key: string]: Resource } = {
  '/posts': 'post',
  '/tags': 'tag',
  '/authors': 'author',
};
