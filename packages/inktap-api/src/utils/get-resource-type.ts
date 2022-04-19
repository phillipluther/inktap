import { Resource, SingleResource } from '@types';
import Post from '@src/models/post.model';
import Tag from '@src/models/tag.model';

export default function getResourceType(resource: SingleResource): Resource | null {
  let resourceType: Resource | null = null;

  if (Post.safeParse(resource).success) {
    resourceType = 'post';
  } else if (Tag.safeParse(resource).success) {
    resourceType = 'tag';
  }

  return resourceType;
}
