import { InktapStoreCollection, InktapStoreObject, InktapStoreKey, InktapSubstore } from '@types';
import { nanoid } from 'nanoid';

export default function createSubstore(name: string, keyProp: string = 'id'): InktapSubstore {
  const substore = new Map();

  return {
    get(id: InktapStoreKey) {
      return substore.get(id) || null;
    },
    find(attributes: InktapStoreObject): InktapStoreCollection {
      const results: InktapStoreCollection = [];
      const attributeKeys = Object.keys(attributes);

      substore.forEach((obj: InktapStoreObject, key: InktapStoreKey) => {
        let isMatch = true;

        for (let i = attributeKeys.length; i--; ) {
          const attributeKey = attributeKeys[i];

          if (obj[attributeKey] !== attributes[attributeKey]) {
            isMatch = false;
            break;
          }
        }

        if (isMatch) {
          results.push(obj);
        }
      });

      return results;
    },
    create(obj: InktapStoreObject) {
      const id = obj[keyProp] || nanoid();

      substore.set(
        id,
        keyProp !== 'id'
          ? obj
          : {
              ...obj,
              id,
            },
      );

      return substore.get(id);
    },
    delete(id: string) {
      const obj = substore.get(id);

      if (obj) {
        substore.delete(id);
      }

      return obj || null;
    },
  };
}
