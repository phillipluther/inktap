export type InktapStoreKey = string | symbol;
export type InktapStoreObject = { [key: InktapStoreKey]: any };
export type InktapStoreCollection = InktapStoreObject[];

export type InktapSubstore = {
  get: (id: InktapStoreKey) => InktapStoreObject;
  find: (attributes: InktapStoreObject) => InktapStoreCollection;
  create: (obj: InktapStoreObject) => InktapStoreObject;
  delete: (id: InktapStoreKey) => InktapStoreObject;
};
