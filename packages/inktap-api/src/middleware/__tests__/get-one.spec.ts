jest.mock('fs');
jest.mock('fs/promises');

import getOne from '../get-one';

describe('middleware/getOne()', () => {
  const res = {
    status: (s: number) => {
      status = s;
      return res;
    },
    json: () => {
      return res;
    },
    send: () => {
      return res;
    },
  };

  const next = jest.fn();

  let middleware: Function;
  let status: number;
  let req: {
    [key: string]: any;
  };
  let consoleMock: jest.Mock;

  beforeEach(() => {
    middleware = getOne('tags'); // tags is the simplest resource
    req = {
      params: {
        id: 'gibberish',
      },
    };

    consoleMock = console.error = jest.fn();
  });

  afterEach(() => {
    consoleMock.mockRestore();
  });

  test('is a middleware factory', () => {
    expect(typeof middleware).toEqual('function');
  });

  test('responds with 404 when resource is not found', async () => {
    req.params.id = 'FAIL:existsSync';
    await middleware(req, res, next);
    expect(status).toEqual(404);
  });

  test('responds with a 500 on server error', async () => {
    req.params.id = 'FAIL:readFile';
    await middleware(req, res, next);
    expect(status).toEqual(500);
  });

  test('calls next() to chain request handlers', async () => {
    await middleware(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('sets a `data` property on the request obj', async () => {
    await middleware(req, res, next);
    expect(req.data).toBeDefined();
    expect(req.data).toEqual('test file contents');
  });
});
