import path from 'path';
import { readdir, readFile } from 'fs/promises';
import { Post as P } from '__types__';
import { POSTS_DIR } from '__constants__';
import { mdToPost } from '__utils__';

export default async function getAllPosts(options = {}): Promise<P[]> {
  try {
    const postFiles = await readdir(POSTS_DIR);
    const posts: P[] = [];

    for (let file of postFiles) {
      if (/\.md$/.test(file)) {
        const md = await readFile(path.join(POSTS_DIR, file));
        posts.push(mdToPost(md.toString()));
      }
    }

    return posts;
  } catch (err) {
    //
    // additional logging
    //
    console.error(err);
    return [];
  }
}
