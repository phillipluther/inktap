/* eslint-disable @typescript-eslint/no-explicit-any */

import Tag, { TagSchema } from '@src/resources/tag.model';
import store from '@src/store';
import createControllers from '../create-controllers';

describe('utils/createControllers()', () => {
  let response: {
    success: boolean;
    data: { [key: string]: any };
  };
  let controllers: { [key: string]: any };
  let req: { [key: string]: any };
  let res: { [key: string]: any };

  let tagIdOne: string;
  let tagIdTwo: string;
  let deleteId: string;

  beforeEach(() => {
    controllers = createControllers(Tag);

    req = {
      params: {},
      body: {
        name: 'tag',
        description: 'description',
      },
    };

    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockImplementation(({ success, data }) => {
        response = {
          success,
          data,
        };

        return res;
      }),
    };

    tagIdOne = store.tags.save(TagSchema.parse({ name: 'demo-tag-one' })).id;
    tagIdTwo = store.tags.save(TagSchema.parse({ name: 'demo-tag-two' })).id;
  });

  afterEach(() => {
    store.tags.delete(tagIdOne);
    store.tags.delete(tagIdTwo);

    if (deleteId) {
      store.tags.delete(deleteId);
      deleteId = '';
    }
  });

  test('returns an object of cruds', () => {
    expect(controllers.getOne).toBeDefined();
    expect(controllers.getMany).toBeDefined();
    expect(controllers.createOne).toBeDefined();
    expect(controllers.updateOne).toBeDefined();
    expect(controllers.deleteOne).toBeDefined();
  });

  test('createOne() creates a resource and responds with a 201', async () => {
    await controllers.createOne(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(response.success).toBe(true);
    expect(response.data.name).toEqual('tag');

    deleteId = response.data.id;
  });

  test('createOne() responds with a 400 and error on failed creation', async () => {
    delete req.body.name;

    await controllers.createOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(response.success).toBe(false);
    expect(response.data).toContain('required');
  });

  test('getMany() responds with an array of resources and 200', async () => {
    await controllers.getMany(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(2);
  });

  test('getMany() responds with a 400 on bad request', async () => {
    req.params = null; // wildly malformed request!

    await controllers.getMany(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(response.success).toBe(false);
  });

  test('getOne() gets a resource by ID with a 200', async () => {
    delete req.body;
    req.params.id = tagIdOne;

    await controllers.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(response.success).toBe(true);
    expect(response.data.id).toEqual(tagIdOne);
  });

  test('getOne() 404s if a resource is not found', async () => {
    delete req.body;
    req.params.id = 'gibberish';

    await controllers.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(response.success).toBe(false);
  });

  test('getOne() responds with a 400 and error on bad request', async () => {
    delete req.body;
    delete req.params;

    await controllers.getOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(response.success).toBe(false);
  });

  test('updateOne() responds with a 200 and the updated resource', async () => {
    req.body.description = 'added';
    req.params.id = tagIdOne;

    await controllers.updateOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(response.success).toBe(true);
    expect(response.data.id).toEqual(tagIdOne);
    expect(response.data.description).toEqual('added');
  });

  test('updateOne() responds with a 404 if no resource found', async () => {
    req.params.id = 'gibberish';

    await controllers.updateOne(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(response.success).toBe(false);
  });

  test('updateOne() responds with a 400 on bad request', async () => {
    delete req.params;

    await controllers.updateOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(response.success).toBe(false);
  });

  test('deleteOne() responds with a 200 and the deleted resource', async () => {
    req.params.id = tagIdTwo;

    await controllers.deleteOne(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(response.success).toBe(true);
    expect(response.data.id).toEqual(tagIdTwo);
  });

  test('deleteOne() response with a 404 if no resource found', async () => {
    req.params.id = 'gibberish';

    await controllers.deleteOne(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(response.success).toBe(false);
  });

  test('deleteOne() responds with a 400 on bad request', async () => {
    delete req.params;

    await controllers.deleteOne(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(response.success).toBe(false);
  });
});
