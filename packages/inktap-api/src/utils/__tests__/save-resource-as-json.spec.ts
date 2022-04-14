import { vol } from 'memfs';
import { nanoid } from 'nanoid';
import saveResourceAsJson from '../save-resource-as-json';
import { Tag } from '@types';
import { TAG_SUFFIX } from '@constants';

jest.mock('fs/promises');

describe('utils/saveAsJson()', () => {
  let testResource: Tag;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON({ './data/tags/single-file.json': '"content"' }, '/test');
    testResource = {
      id: nanoid(),
      name: 'test',
      created: new Date(),
    };
  });

  test('creates a file named by ID in a given directory', async () => {
    await saveResourceAsJson(testResource);
    expect(vol.existsSync(`/test/data/tags/${testResource.id}${TAG_SUFFIX}`)).toBe(true);
  });

  test('returns the created resource filepath', async () => {
    const filepath = await saveResourceAsJson(testResource);
    expect(filepath).toEqual(`/test/data/tags/${testResource.id}${TAG_SUFFIX}`);
  });

  test('logs and throws on error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect.assertions(2);

    try {
      // @ts-ignore
      await saveResourceAsJson(null);
    } catch (err: any) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(err.toString()).toContain('Could not write data');
    }
  });
});
