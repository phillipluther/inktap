jest.mock('fs');
jest.mock('fs/promises');
import getMany from '../get-many';

describe('middleware/getMany()', () => {
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

  const next = () => undefined;

  let middleware: Function;
  let status: number;
  let req: {
    [key: string]: any;
  };
  let consoleMock: jest.Mock;

  beforeEach(() => {
    middleware = getMany('tags');
    req = {
      query: {},
    };
    consoleMock = console.error = jest.fn();
  });

  afterEach(() => {
    consoleMock.mockRestore();
  });

  test('is a middleware factory', () => {
    expect(typeof middleware).toEqual('function');
  });

  test('attaches data to the request object', async () => {
    await middleware(req, res, next); // fails on readFile
    expect(req.data).toBeDefined();
  });

  test('attaches data only for matching resources', async () => {
    await middleware(req, res, next);
    expect(req.data).toHaveLength(2);
  });

  test('returns a 500 on error', async () => {
    await middleware(req, res, () => {
      throw new Error('bad');
    });
    expect(status).toEqual(500);
  });
});
