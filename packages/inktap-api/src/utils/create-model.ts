import { z, ZodSchema } from 'zod';
import { ResourceModel } from '@types';

function createModel(Schema: ZodSchema): ResourceModel {
  const Model = {
    createOne(data: z.infer<typeof Schema>) {
      const resource = Schema.parse(data);
      return resource;
    },
    getOne(id: string) {
      console.log(`Finding by ID ${id}`);
      return Schema.parse({
        name: 'fake-resource',
      });
    },
    getMany() {
      console.log('Getting many');
      return [
        Schema.parse({ name: 'fake-resource-one' }),
        Schema.parse({ name: 'fake-resource-two' }),
        Schema.parse({ name: 'fake-resource-three' }),
      ];
    },
    updateOne(id: string, data = {}) {
      const resource = Model.getOne(id);

      if (!resource) {
        return null;
      }

      const updatedTag = Schema.parse({ ...resource, ...data });
      return updatedTag;
    },
    deleteOne(id: string) {
      const resource = Model.getOne(id);

      if (!resource) {
        return null;
      }

      console.log(`Deleting tag with ID ${id}`);
      return resource;
    },
  };

  return Model;
}

export default createModel;
