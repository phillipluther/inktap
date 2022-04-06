import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { Post } from '__types__';
import { mdToPost } from '__utils__';
import { CONTENT_DIR } from '__constants__';

export default async function getPost(id: string): Promise<Post | null> {
  try {
    const postPath = path.join(CONTENT_DIR, id, `${id}.md`);

    if (!existsSync(postPath)) {
      return null;
    }

    const md = await readFile(postPath);
    const post = mdToPost(md.toString());

    return post;
  } catch (err) {
    console.error(err);
    return null;
  }
}
