import { vol } from 'memfs';
import { nanoid } from 'nanoid';
import saveResourceAsJson from '../save-resource-as-json';
import { Tag } from '@types';

jest.mock('fs/promises');

describe('utils/saveAsJson()', () => {
  let testResource: Tag;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON({ './dir/single-file.txt': 'content' }, '/test');
    testResource = {
      id: nanoid(),
      name: 'test',
      created: new Date(),
    };
  });

  test('creates a file named by ID in a given directory', async () => {
    await saveResourceAsJson('/test/dir', testResource);
    expect(vol.existsSync(`/test/dir/${testResource.id}.json`)).toBe(true);
  });

  test('creates a directory if nonexistent', async () => {
    await saveResourceAsJson('/test/new/nested/dir', testResource);
    expect(vol.existsSync(`/test/new/nested/dir/${testResource.id}.json`)).toBe(true);
  });

  test('logs and throws on error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect.assertions(2);

    try {
      // @ts-ignore
      await saveResourceAsJson('/test/dir', null);
    } catch (err: any) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(err.toString()).toContain('Could not write data');
    }
  });
});
