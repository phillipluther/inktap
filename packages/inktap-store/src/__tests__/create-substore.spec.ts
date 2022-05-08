import createSubstore from '@src/create-substore';
import { InktapSubstore } from '@types';

describe('createSubstore()', () => {
  let substore: InktapSubstore;
  let thing2id: string;

  beforeEach(() => {
    substore = createSubstore('substore');

    substore.save({ thing: 1 });
    substore.save({ thing: 1 });
    thing2id = substore.save({ thing: 2 }).id;
    substore.save({ thing: 3 });
  });

  test('exposes methods for managing a collection of objects', () => {
    // TS is providing this for free via the InktapSubstore type though, right?
    expect(substore.get).toBeDefined();
    expect(typeof substore.get).toEqual('function');

    expect(substore.find).toBeDefined();
    expect(typeof substore.find).toEqual('function');

    expect(substore.save).toBeDefined();
    expect(typeof substore.save).toEqual('function');

    expect(substore.delete).toBeDefined();
    expect(typeof substore.delete).toEqual('function');
  });

  test('on create, assigns an ID if missing', () => {
    const { id } = substore.save({ thing: 2 });
    expect(id).toBeDefined();
  });

  test('uses a specified key on creation', () => {
    substore = createSubstore('test', 'key');
    const obj = substore.save({ thing: 2, key: '123' });

    expect(obj.id).toBeUndefined();
    expect(substore.get('123')).toEqual(obj);
  });

  test('throws if creating non-objects', () => {
    expect.assertions(1);

    try {
      // @ts-ignore
      substore.save(99);
    } catch (err) {
      expect(err + '').toContain('Expected an object');
    }
  });

  test('gets a single item', () => {
    expect(substore.get(thing2id)).toEqual({
      thing: 2,
      id: thing2id,
    });
  });

  test('returns null if no item found', () => {
    expect(substore.get('gibberish')).toBeNull();
  });

  test('finds multiple items', () => {
    expect(substore.find({ thing: 1 })).toHaveLength(2);
  });

  test('finds no items', () => {
    expect(substore.find({ thing: 5 })).toEqual([]);
  });

  test('deletes an item from the store', () => {
    const { id } = substore.save({ thing: 1 });
    substore.save({ thing: 2 });
    substore.save({ thing: 3 });

    substore.delete(id);

    expect(substore.get(id)).toBeNull();
  });

  test('returns a deleted object', () => {
    const obj = substore.delete(thing2id);
    expect(obj).toEqual({
      id: thing2id,
      thing: 2,
    });
  });

  test('returns null if nothing to delete', () => {
    const obj = substore.delete('gibberish');
    expect(obj).toBeNull();
  });

  test('updates an item like a normal object', () => {
    const obj = substore.save({ thing: 1 });
    obj.thing = 2;
    obj.anotherProp = true;

    const found = substore.find({ anotherProp: true });

    expect(found).toHaveLength(1);
    expect(found[0].id).toEqual(obj.id);
    expect(found[0].thing).toEqual(2);
  });
});
