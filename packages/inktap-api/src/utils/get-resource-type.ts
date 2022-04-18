import { Resource, SingleResource } from '@types';
import Post from '@src/models/post';
import Tag from '@src/models/tag';

export default function getResourceType(resource: SingleResource): Resource | null {
  let resourceType: Resource | null = null;

  if (Post.safeParse(resource).success) {
    resourceType = 'post';
  } else if (Tag.safeParse(resource).success) {
    resourceType = 'tag';
  }

  return resourceType;
}
