import path from 'path';
import { existsSync } from 'fs';
import { readdir, readFile } from 'fs/promises';
import { Post as P } from '__types__';
import { POSTS_DIR } from '__constants__';
import { mdToPost } from '__utils__';

const defaultOps = {
  postsDir: POSTS_DIR,
};

export default async function getAllPosts(userOpts = {}): Promise<P[]> {
  try {
    const opts = { ...defaultOps, ...userOpts };

    if (!existsSync(opts.postsDir)) {
      return [];
    }

    const postFiles = await readdir(opts.postsDir);
    const posts: P[] = [];

    for (let file of postFiles) {
      if (/\.md$/.test(file)) {
        const md = await readFile(path.join(opts.postsDir, file));
        posts.push(mdToPost(md.toString()));
      }
    }

    return posts;
  } catch (err) {
    //
    // additional logging
    //
    console.error(err);
    throw new Error('Could not get all posts');
  }
}
