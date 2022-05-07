import { InktapStore, InktapStoreObject } from '@types';
import createSubstore from './create-substore';
import isObject from 'isobject';

export default function createStore(data: { [key: string]: InktapStoreObject[] } = {}) {
  const store: InktapStore = Object.create({
    createSubstore(name: string, keyProp?: string) {
      if (!!store[name]) {
        throw new Error(`Substore '${name}' already exists`);
      }

      store[name] = createSubstore(name, keyProp);
      return store[name];
    },
  });

  /**
   * if this ever opens up, we'll need to do some shape validation on this data. making a lot
   * of assumptions that it looks exactly like our API resources
   *
   * {
   *   tags: [{ ... }, { ... }],
   *   posts: [{ ... }, { ... }],
   *   etc.
   * }
   */
  Object.keys(data).forEach((key) => {
    store[key] = createSubstore(key);

    data[key].forEach((obj) => {
      store[key].create(obj);
    });
  });

  return store;
}
