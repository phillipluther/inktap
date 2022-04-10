import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { nanoid } from 'nanoid';
import postToMd from './post-to-md';
import { PostType as P } from '../post.model';
import { POSTS_DIR } from '@constants';

export default async function postToFile(post: P): Promise<P> {
  try {
    const { id = nanoid(), ...postData } = post;
    const postToWrite = {
      id,
      ...postData,
    };
    const md = postToMd(postToWrite);

    await mkdir(POSTS_DIR, { recursive: true });
    await writeFile(path.join(POSTS_DIR, `${id}.md`), md);

    return postToWrite;
  } catch (err) {
    console.error(err);
    throw new Error('Could not write post to file');
  }
}
