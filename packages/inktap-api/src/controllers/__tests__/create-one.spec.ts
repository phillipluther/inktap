import { z } from 'zod';
import createOne from '../create-one';

jest.mock('fs');
jest.mock('fs/promises');

describe('controllers/createOne()', () => {
  const Model = z.object({
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
        one: 'hey',
        two: 2,
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
    expect(res.status).toHaveBeenCalledWith(201);

    // fail state
    req.body.two = 'error';
    await controller(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('gracefully handle server-side error', async () => {
    await controller(null, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
