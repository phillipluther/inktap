import { ResourceModel, Tag } from '@types';
import { TagSchema } from '@src/resources/tag/tag.model';
import createModel from '../create-model';

describe('utils/createModel()', () => {
  let mod: ResourceModel;

  beforeEach(() => {
    mod = createModel(TagSchema);
  });

  test('returns an object of cruds', () => {
    expect(mod.getOne).toBeDefined();
    expect(mod.getMany).toBeDefined();
    expect(mod.createOne).toBeDefined();
    expect(mod.updateOne).toBeDefined();
    expect(mod.deleteOne).toBeDefined();
  });

  test('creates an instance', () => {
    const instance = mod.createOne({
      name: 'test',
      description: 'tested',
    } as Tag);

    expect((instance as Tag).name).toEqual('test');
  });
});
