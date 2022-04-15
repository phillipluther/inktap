import withControllers from '../with-controllers';

describe('utils/withControllers()', () => {
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      route: jest.fn().mockImplementation(() => mockRouter),
      get: jest.fn().mockImplementation(() => mockRouter),
      post: jest.fn().mockImplementation(() => mockRouter),
      put: jest.fn().mockImplementation(() => mockRouter),
      patch: jest.fn().mockImplementation(() => mockRouter),
      delete: jest.fn().mockImplementation(() => mockRouter),
    };

    withControllers(mockRouter);
  });

  test('returns a router instance', () => {
    expect(withControllers(mockRouter)).toEqual(mockRouter);
  });

  test('establishes two routes', () => {
    expect(mockRouter.route).toHaveBeenCalledTimes(2);
    expect(mockRouter.route).toHaveBeenCalledWith('/');
    expect(mockRouter.route).toHaveBeenCalledWith('/:id');
  });

  test('establishes GET routes', () => {
    expect(mockRouter.get).toHaveBeenCalledTimes(2);
  });

  test('establishes a POST route', () => {
    expect(mockRouter.post).toHaveBeenCalledTimes(1);
  });

  test('establishes a PUT route', () => {
    expect(mockRouter.put).toHaveBeenCalledTimes(1);
  });

  test('establishes a PATCH route', () => {
    expect(mockRouter.patch).toHaveBeenCalledTimes(1);
  });

  test('establishes a DELETE route', () => {
    expect(mockRouter.delete).toHaveBeenCalledTimes(1);
  });
});
