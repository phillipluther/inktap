import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { Tag, Post } from '@types';

export default async function saveResourceAsJson(dir: string, resource: Tag | Post) {
  try {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${resource.id}.json`), JSON.stringify(resource));
  } catch (err) {
    console.error(err);
    throw new Error('Could not write data to file');
  }
}
