export type InktapStoreKey = string | symbol;
export type InktapStoreObject = { [key: InktapStoreKey]: any };
export type InktapStoreCollection = InktapStoreObject[];

export type InktapSubstore = {
  get: (id: string) => InktapStoreObject;
  find: (attributes: InktapStoreObject) => InktapStoreCollection;
  create: (obj: InktapStoreObject) => InktapStoreObject;
  delete: (id: string) => InktapStoreObject;
};
