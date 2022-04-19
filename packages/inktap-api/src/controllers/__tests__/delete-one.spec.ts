import { vol } from 'memfs';
import TagModel from '@src/models/tag.model';
import deleteOne from '../delete-one';

jest.mock('fs');
jest.mock('fs/promises');

describe('controllers/deleteOne()', () => {
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
        './data/tags/123b.json': JSON.stringify({ valid: false }),
      },
      '/test',
    );

    req = {
      params: {
        id: '123a',
      },
      baseUrl: '/tags',
    };

    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(() => res),
    };

    controller = deleteOne(TagModel);

    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  test('is a controller factory expecting a model', () => {
    expect(typeof controller).toEqual('function');
  });

  test('404s if a resource is not found', async () => {
    req.params.id = 'gibberish';
    await controller(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('removes a file', async () => {
    const filepath = '/test/data/tags/123a.json';
    expect(vol.existsSync(filepath)).toBe(true);
    await controller(req, res);
    expect(vol.existsSync(filepath)).toBe(false);
  });

  test('responds with a 200 and the deleted resource', async () => {
    await controller(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: testTag,
    });
  });

  test('gracefully handle server-side error', async () => {
    await controller(null, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
