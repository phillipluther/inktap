import path from 'path';
import { DATA_DIR, TAGS_DIR, POSTS_DIR, RESOURCE_SUFFIXES } from '@constants';
import { SingleResource } from '@types';
import { getResourceType } from '@src/utils';

export default function getFilepathFromResource(resource: SingleResource): string {
  const resourceType = getResourceType(resource);
  let dir = DATA_DIR;
  let suffix = '.unknown.json';

  if (resourceType === 'post') {
    dir = POSTS_DIR;
    suffix = RESOURCE_SUFFIXES.posts;
  } else if (resourceType === 'tag') {
    dir = TAGS_DIR;
    suffix = RESOURCE_SUFFIXES.tags;
  }

  return path.join(dir, `${resource.id}${suffix}`);
}
