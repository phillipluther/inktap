import { z, ZodSchema } from 'zod';
import { ResourceModel } from '@types';
import pluralize from 'pluralize';
import store from '@src/store';

function createModel(modelName: string, Schema: ZodSchema): ResourceModel {
  const collectionName = pluralize(modelName);

  if (!store[collectionName]) {
    store.createSubstore(collectionName);
  }

  const collection = store[collectionName];

  const Model = {
    async createOne(data: z.infer<typeof Schema>) {
      const resource = Schema.parse(data);
      return collection.save(resource);
    },
    async getOne(id: string) {
      return collection.get(id);
    },
    async getMany(attributes = {}) {
      return collection.find(attributes);
    },
    async updateOne(id: string, data = {}) {
      const resource = await Model.getOne(id);
      if (!resource) {
        return null;
      }

      // can't override updates or ID!
      const updated = resource.updated.concat(new Date());

      return collection.save(Schema.parse({ ...resource, ...data, updated, id }), 'id');
    },
    async deleteOne(id: string) {
      return collection.delete(id);
    },
  };

  return Model;
}

export default createModel;
