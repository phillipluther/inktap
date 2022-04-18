import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { getFilepathFromResource } from '@src/utils';
import { SingleResource } from '@types';

export default async function saveResource(resource: SingleResource): Promise<string> {
  try {
    const filepath = getFilepathFromResource(resource);
    const { dir } = path.parse(filepath);

    await mkdir(dir, { recursive: true });
    await Promise.all([writeFile(filepath, JSON.stringify(resource))]);

    return filepath;
  } catch (err) {
    console.error(err);
    throw new Error('Could not save resource');
  }
}
