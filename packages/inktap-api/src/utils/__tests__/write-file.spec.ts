import { vol } from 'memfs';
import writeFile from '../write-file';

jest.mock('fs/promises');

describe('utils/writeFile()', () => {
  let testPost: any;
  let testTag: any;

  const filepath = '/test/data/tags/123b.json';

  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        './data/posts/single-file.json': 'content',
        './data/tags/single-file.json': '"content"',
      },
      '/test',
    );

    testTag = {
      id: '123b',
      name: 'test',
    };
  });

  test('writes to a file', async () => {
    await writeFile(filepath, JSON.stringify(testTag));
    expect(vol.existsSync(filepath)).toBe(true);
  });

  test('returns the created resource filepath', async () => {
    const returned = await writeFile(filepath, 'a');
    expect(filepath).toEqual(returned);
  });

  test('creates a directory if non-existent', async () => {
    const filepath = '/test/data/tags/deeply/nested/file.json';
    expect(vol.existsSync(filepath)).toBe(false);

    await writeFile(filepath, 'a');
    expect(vol.existsSync(filepath)).toBe(true);
  });

  test('logs and throws on error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect.assertions(2);

    try {
      // @ts-ignore
      await writeFile(null);
    } catch (err: any) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(err.toString()).toContain('Could not write');
    }
  });
});
