import Tag from '@src/resources/tag/tag.model';
import createControllers from '../create-controllers';

describe('utils/createModel()', () => {
  let controllers: { [key: string]: any };

  beforeEach(() => {
    controllers = createControllers(Tag);
  });

  test('returns an object of cruds', () => {
    expect(controllers.getOne).toBeDefined();
    expect(controllers.getMany).toBeDefined();
    expect(controllers.createOne).toBeDefined();
    expect(controllers.updateOne).toBeDefined();
    expect(controllers.deleteOne).toBeDefined();
  });
});
