import { z } from 'zod';
import { vol } from 'memfs';
import createOne from '../create-one';

jest.mock('fs');
jest.mock('fs/promises');

describe('controllers/createOne()', () => {
  const Model = z.object({
    id: z.string(),
    one: z.string(),
    two: z.number(),
  });

  let controller: any;
  let req: any;
  let res: any;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    controller = createOne(Model);

    req = {
      body: {
        id: '123a',
        one: 'hey',
        two: 2,
      },
      baseUrl: '/tags',
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
    expect(res.status).toHaveBeenCalledWith(201);

    // fail state
    req.body.two = 'error';
    await controller(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('writes a resource file', async () => {
    await controller(req, res);
    expect(vol.existsSync('/test/data/tags/123a.json')).toBe(true);
  });

  test('gracefully handles server-side error', async () => {
    await controller(null, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
