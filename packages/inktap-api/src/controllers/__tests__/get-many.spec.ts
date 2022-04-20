import { vol } from 'memfs';
import TagSchema from '@src/schemas/tag.schema';
import getMany from '../get-many';

jest.mock('fs');
jest.mock('fs/promises');

describe('controllers/getMany()', () => {
  const tagOne = JSON.parse(JSON.stringify({ id: '123a', name: 'tag', created: new Date() }));
  const tagTwo = JSON.parse(JSON.stringify({ id: '123b', name: 'tag', created: new Date() }));
  const tagThree = JSON.parse(JSON.stringify({ id: '123c', name: 'tag', created: new Date() }));

  let controller: any;
  let req: any;
  let res: any;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        './data/tags/123a.json': JSON.stringify(tagOne),
        './data/tags/123b.json': JSON.stringify(tagTwo),
        './data/tags/123c.json': JSON.stringify(tagThree),
      },
      '/test',
    );

    req = {
      baseUrl: '/tags',
    };

    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };

    controller = getMany(TagSchema);

    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  test('is a controller factory expecting a model', () => {
    expect(typeof controller).toEqual('function');
  });

  test('returns an empty array if no resources', async () => {
    vol.rmSync('/test/data/tags/123a.json');
    vol.rmSync('/test/data/tags/123b.json');
    vol.rmSync('/test/data/tags/123c.json');

    await controller(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [],
    });
  });

  test('responds with a 200 and the resource collection', async () => {
    await controller(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [tagOne, tagTwo, tagThree],
    });
  });

  test('gracefully handles server-side error', async () => {
    await controller(null, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
