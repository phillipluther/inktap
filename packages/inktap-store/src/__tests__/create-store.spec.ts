import createStore from '@src/create-store';
import { InktapStore, InktapSubstore } from '@types';

describe('createStore()', () => {
  function isSubstore(s: InktapSubstore): boolean {
    const expectedMethods: { [key: string]: boolean } = {
      get: false,
      find: false,
      save: false,
      delete: false,
    };

    Object.keys(s).forEach((key: string) => {
      expectedMethods[key] = true;
    });

    const { get: canGet, find: canFind, save: canSave, delete: canDelete } = expectedMethods;

    return canGet && canFind && canSave && canDelete;
  }

  let store: InktapStore;

  const mockData = {
    key1: [{ thing: 1 }, { thing: 2 }],
    key2: [{ thing: 3 }, { thing: 4 }],
  };

  beforeEach(() => {
    store = createStore();
  });

  test('can create new substores', () => {
    expect(isSubstore(store.createSubstore('tags'))).toBe(true);
  });

  test('builds a store of substores from data', () => {
    store = createStore(mockData);

    expect(isSubstore(store.key1)).toBe(true);
    expect(isSubstore(store.key2)).toBe(true);
  });

  test('throws if trying to overwrite a substore', () => {
    expect.assertions(1);

    try {
      store.createSubstore('e');
      store.createSubstore('e');
    } catch (err) {
      expect(err + '').toContain('already exists');
    }
  });
});
