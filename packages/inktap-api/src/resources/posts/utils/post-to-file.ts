import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { nanoid } from 'nanoid';
import postToMd from './post-to-md';
import { PostType as P } from '../post.model';
import { POSTS_DIR } from '__constants__';

export default async function postToFile(post: P): Promise<P | null> {
  try {
    const { id = nanoid(), ...postData } = post;
    const md = postToMd({
      id,
      ...postData,
    });

    await mkdir(POSTS_DIR, { recursive: true });
    await writeFile(path.join(POSTS_DIR, `${id}.md`), md);

    return post;
  } catch (err) {
    console.error(err);
    return null;
  }
}
