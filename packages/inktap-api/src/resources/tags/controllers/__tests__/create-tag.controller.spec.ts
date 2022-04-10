import path from 'path';
import { rmSync, existsSync } from 'fs';
import createTag from '../create-tag.controller';
import { TAGS_DIR, TAG_SUFFIX } from '@constants';

describe('POST /tags controller', () => {
  let req: any;
  let res: any;
  let responseStatus: number;
  let responseData: { id?: string } = {};

  beforeEach(() => {
    req = { body: { name: 'test', description: 'test tag' } };
    res = {
      status: (status: number) => {
        responseStatus = status;
        return res;
      },
      json: (json: any) => {
        responseData = json.data;
        return res;
      },
    };
  });
  afterEach(() => {
    const data = responseData || {};
    const { id } = data;

    if (id) {
      const tagFilepath = path.join(TAGS_DIR, `${id}${TAG_SUFFIX}`);

      if (existsSync(tagFilepath)) {
        rmSync(tagFilepath);
      }
    }
  });

  it('responds with a 201 status on success', async () => {
    await createTag(req, res);
    expect(responseStatus).toEqual(201);
  });

  it('responds with a 400 on invalid tag', async () => {
    await createTag({ body: {} } as any, res);
    expect(responseStatus).toEqual(400);
  });

  it('creates a tag data file named as the ID', async () => {
    await createTag(req, res);
    expect(existsSync(path.join(TAGS_DIR, `${responseData.id}${TAG_SUFFIX}`))).toBe(true);
  });
});
