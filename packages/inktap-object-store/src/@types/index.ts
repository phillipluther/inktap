export type InktapStoreKey = string | symbol;
export type InktapStoreObject = { [key: InktapStoreKey]: any };
export type InktapStoreCollection = InktapStoreObject[];

export type InktapSubstore = {
  get: (id: InktapStoreKey) => InktapStoreObject;
  find: (attributes: InktapStoreObject) => InktapStoreCollection;
  save: (obj: InktapStoreObject) => InktapStoreObject;
  delete: (id: InktapStoreKey) => InktapStoreObject;
};

export interface InktapStoreMethods {
  createSubstore: (name: string, keyProp?: string) => InktapSubstore;
}

export type InktapStore = InktapStoreMethods & {
  [key: InktapStoreKey]: InktapSubstore;
};
