import { z, ZodSchema } from 'zod';
import { Tag, ResourceCollection, Resources, SingleResource } from '@types';
import TagSchema from '@src/resources/tag/tag.schema';

function cruds(collectionName: Resources, Schema: ZodSchema) {
  type ResourceType = z.infer<typeof Schema>;

  return {
    add(data: ResourceType) {
      console.log('Adding a resource!', data);
    },
    remove(data: string | ResourceType, limit?: number) {},
  };
}

const STORE: {
  tags: Tag[];
  // posts: Post[];
} = {
  tags: [],
  // posts: []
};

export default {
  tags: cruds('tags', TagSchema),
  // posts: cruds('posts', PostSchema)
};
