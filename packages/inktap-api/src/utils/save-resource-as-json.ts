import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { Tag, Post } from '@types';
import { getFilepathFromResource } from '@utils';

export default async function saveResourceAsJson(resource: Tag | Post): Promise<string | null> {
  try {
    const filepath = getFilepathFromResource(resource).toString();

    if (filepath) {
      const { dir } = path.parse(filepath);
      await mkdir(dir, { recursive: true });
      await writeFile(filepath, JSON.stringify(resource));
    }

    return filepath;
  } catch (err) {
    console.error(err);
    throw new Error('Could not write data to file');
  }
}
