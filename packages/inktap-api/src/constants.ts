import path from 'path';

export const SRC_DIR = path.join(process.cwd(), 'src');
export const CONTENT_DIR =
  process.env.NODE_ENV === 'test'
    ? path.resolve('src/__tests__/_content')
    : path.join(process.cwd(), 'content');

export const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
