import path from 'path';
import { DATA_DIR, TAGS_DIR, POSTS_DIR } from '@constants';
import { SingleResource } from '@types';
import { getResourceType } from '@src/utils';

export default function getFilepathFromResource(resource: SingleResource): string {
  const resourceType = getResourceType(resource);
  let dir = DATA_DIR;

  if (resourceType === 'post') {
    dir = POSTS_DIR;
  } else if (resourceType === 'tag') {
    dir = TAGS_DIR;
  }

  return path.join(dir, `${resource.id}.json`);
}
