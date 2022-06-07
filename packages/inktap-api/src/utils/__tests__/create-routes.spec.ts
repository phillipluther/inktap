/* eslint-disable @typescript-eslint/ban-ts-comment */
import Express, { Express as ExpressInterface } from 'express';
import createRoutes from '../create-routes';

describe('utils/createRoutes()', () => {
  let app: ExpressInterface;
  let routedApp: ExpressInterface | null;

  beforeEach(async () => {
    console.log = jest.fn();
    console.error = jest.fn();

    app = Express();
    routedApp = await createRoutes(app);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns an Express instance', () => {
    expect(typeof routedApp).toEqual(typeof Express);
  });

  test('returns null on internal error', async () => {
    // @ts-ignore
    routedApp = await createRoutes({});
    expect(routedApp).toBeNull();
  });
});
