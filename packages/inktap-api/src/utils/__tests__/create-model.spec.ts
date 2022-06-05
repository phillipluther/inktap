import { ResourceModel, Tag } from '@types';
import { TagSchema } from '@src/resources/tag/tag.model';
import createModel from '../create-model';

describe('utils/createModel()', () => {
  let mod: ResourceModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instance: { [key: string]: any };

  beforeEach(async () => {
    mod = createModel('tag', TagSchema);

    instance = await mod.createOne({
      name: 'test',
      description: 'tested',
    } as Tag);
  });

  afterEach(async () => {
    const allResources = await mod.getMany();

    for (const resource of allResources) {
      await mod.deleteOne(resource.id);
    }
  });

  test('returns an object of cruds', () => {
    expect(mod.getOne).toBeDefined();
    expect(mod.getMany).toBeDefined();
    expect(mod.createOne).toBeDefined();
    expect(mod.updateOne).toBeDefined();
    expect(mod.deleteOne).toBeDefined();
  });

  test('creates a resource instance', async () => {
    expect(instance.name).toEqual('test');
  });

  test('gets a resource by ID', async () => {
    const name = 'test2';
    const { id } = await mod.createOne({
      name,
    } as Tag);

    const gotten = (await mod.getOne(id)) as Tag;

    if (gotten) {
      expect(gotten.name).toEqual('test2');
    }
  });

  test('returns null if no resource found', async () => {
    const gotten = await mod.getOne('gibberish');
    expect(gotten).toBeNull();
  });

  test('deletes a resource by ID', async () => {
    const deleted = (await mod.deleteOne(instance.id)) as Tag;

    expect(deleted.id).toEqual(instance.id);
    expect(await mod.deleteOne(instance.id)).toBeNull();
  });

  test('returns an array of resources', async () => {
    instance = await mod.createOne({
      name: 'test2',
    } as Tag);

    instance = await mod.createOne({
      name: 'test3',
    } as Tag);

    expect(await mod.getMany()).toHaveLength(3);
  });

  test('returns an empty array if no resources found', async () => {
    await mod.deleteOne(instance.id);
    expect(await mod.getMany()).toEqual([]);
  });

  test('updates a resources', async () => {
    await mod.updateOne(instance.id, {
      description: 'edited',
    });

    expect(((await mod.getOne(instance.id)) as Tag).description).toEqual('edited');
  });

  test('adds an updated timestamp', async () => {
    (await mod.updateOne(instance.id, {
      description: 'edited',
    })) as Tag;

    const updated = (await mod.updateOne(instance.id, {
      description: 'edited again',
    })) as Tag;

    expect(updated.updated).toHaveLength(2);
  });

  test('prevents overwriting IDs', async () => {
    const updated = await mod.updateOne(instance.id, {
      id: 'gibberish',
    });

    expect(updated && updated.id).toEqual(instance.id);
  });

  test('returns null if nothing to update', async () => {
    expect(await mod.updateOne('gibberish', {})).toBeNull();
  });
});
