import { z, ZodSchema } from 'zod';
import { ResourceModel, SingleResource } from '@types';

function createModel(modelName: string, Schema: ZodSchema): ResourceModel {
  const Model = {
    async createOne(data: z.infer<typeof Schema>) {
      const resource = Schema.parse(data);
      return resource;
    },
    async getOne(id: string) {
      return {} as SingleResource;
    },
    async getMany() {
      console.log('Getting many');
      return [
        Schema.parse({ name: 'fake-resource-one' }),
        Schema.parse({ name: 'fake-resource-two' }),
        Schema.parse({ name: 'fake-resource-three' }),
      ];
    },
    async updateOne(id: string, data = {}) {
      const resource = await Model.getOne(id);

      if (!resource) {
        return null;
      }

      const updatedTag = Schema.parse({ ...resource, ...data });
      return updatedTag;
    },
    async deleteOne(id: string) {
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
