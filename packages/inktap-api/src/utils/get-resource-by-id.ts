import path from 'path';
import { Resource } from '@types';
import { RESOURCE_DIRS } from '@constants';
import { readFile } from '@utils';

export default async function getResourceById(resourceType: Resource, id: string) {
  try {
    const dir = RESOURCE_DIRS[resourceType];
    const filepath = path.join(dir, `${id}.json`);
    const fileContents = await readFile(filepath);

    if (!fileContents) {
      return null;
    }

    return JSON.parse(fileContents);
  } catch (err) {
    console.error(err);
    throw new Error('Could not get resource by ID');
  }
}
