import path from 'path';
import { Resource } from '@types';
import { DATA_DIR, RESOURCE_DIRS, RESOURCE_SUFFIXES } from '@constants';
import { readFile } from '@utils';
import { mdToPost } from '@src/resources/posts/utils';

export default async function getResourceById(resourceType: Resource, id: string) {
  try {
    const dir = RESOURCE_DIRS[resourceType];
    const suffix = RESOURCE_SUFFIXES[resourceType];
    const filepath = path.join(dir, `${id}${suffix}`);
    const fileContents = await readFile(filepath);

    if (!fileContents) {
      return null;
    }
    return /\.json$/.test(suffix) ? JSON.parse(fileContents) : mdToPost(fileContents);
  } catch (err) {
    console.error(err);
    throw new Error('Could not get resource by ID');
  }
}
