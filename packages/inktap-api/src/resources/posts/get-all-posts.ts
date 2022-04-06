import path from 'path';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { Post as P } from '__types__';
import { CONTENT_DIR } from '__constants__';
import { mdToPost } from '__utils__';
import Post from './post.model';

export default async function getAllPosts(options = {}): Promise<P[]> {
  try {
    const postDirs = await readdir(CONTENT_DIR);
    const posts: P[] = [];

    for (let dir of postDirs) {
      const dirContents = await readdir(path.join(CONTENT_DIR, dir));

      for (let filename of dirContents) {
        if (/\.md$/.test(filename)) {
          const md = await readFile(path.join(CONTENT_DIR, dir, filename));
          posts.push(mdToPost(md.toString()));
        }
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
