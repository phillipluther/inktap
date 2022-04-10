import path from 'path';
import { Suffixes } from '@types';

export const SRC_DIR = path.join(process.cwd(), 'src');
export const DATA_DIR =
  process.env.NODE_ENV === 'test'
    ? path.resolve('src/__tests__/_content')
    : path.join(process.cwd(), 'data');

export const POSTS_DIR = path.join(DATA_DIR, 'posts');
export const TAGS_DIR = path.join(DATA_DIR, 'tags');

export const TAG_SUFFIX = '.tag.json';

export const RESOURCE_FILE_SUFFIXES: Suffixes = {
  posts: '.post.md',
  tags: '.tag.json',
};
