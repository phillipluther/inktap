import { vol } from 'memfs';
import TagModel from '@src/models/tag.model';
import { getResourceById } from '@src/utils';
import updateOne from '../update-one';

jest.mock('fs');
jest.mock('fs/promises');

describe('controllers/updateOne()', () => {
  const testTag = JSON.parse(JSON.stringify({ id: '123a', name: 'tag', created: new Date() }));

  let controller: any;
  let req: any;
  let res: any;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        './data/tags/123a.json': JSON.stringify(testTag),
      },
      '/test',
    );

    controller = updateOne(TagModel);

    req = {
      params: {
        id: '123a',
      },
      baseUrl: '/tags',
      body: {
        name: 'edited',
      },
    };

    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };

    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  test('is a controller factory expecting a model', () => {
    expect(typeof controller).toEqual('function');
  });

  test('validates a given resource', async () => {
    await controller(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    // fail state
    req.body.name = 44;
    await controller(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('404s if a resource is not found', async () => {
    req.params.id = 'gibberish';
    await controller(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('updates a resource', async () => {
    await controller(req, res);
    const data = await getResourceById('tag', '123a');

    expect(data.name).toEqual('edited');
  });

  test('gracefully handle server-side error', async () => {
    await controller(null, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
