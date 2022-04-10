import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { Post } from '@types';
import { mdToPost } from '../utils';
import { POSTS_DIR } from '@constants';

export default async function getPost(id: string): Promise<Post | null> {
  try {
    const postPath = path.join(POSTS_DIR, `${id}.md`);

    if (!existsSync(postPath)) {
      return null;
    }

    const md = await readFile(postPath);
    const post = mdToPost(md.toString());

    return post;
  } catch (err) {
    //
    // additional logging
    //
    console.error(err);
    throw new Error('Could not get post by ID');
  }
}
