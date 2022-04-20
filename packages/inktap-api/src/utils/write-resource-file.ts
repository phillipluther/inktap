import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { RESOURCE_DIRS } from '@src/constants';
import { SingleResource, Resource } from '@types';

export default async function saveResource(
  resourceType: Resource,
  data: SingleResource,
): Promise<string> {
  try {
    const dir = RESOURCE_DIRS[resourceType];
    const filepath = path.join(dir, `${data.id}.json`);

    await mkdir(dir, { recursive: true });
    await writeFile(filepath, JSON.stringify(data));

    return filepath;
  } catch (err) {
    console.error(err);
    throw new Error('Could not save resource');
  }
}
