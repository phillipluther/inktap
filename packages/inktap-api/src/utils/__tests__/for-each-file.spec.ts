import forEachFile from '../for-each-file';
import { vol } from 'memfs';

jest.mock('fs');
jest.mock('fs/promises');

describe('utils/forEachFile()', () => {
  let iterator = jest.fn();
  let spy: jest.SpyInstance;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        './dir/file1.txt': 'ok',
        './dir/file2.txt': 'got it',
        './dir/file3.txt': 'right on',
      },
      '/test',
    );

    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("does nothing if a given directory doesn't exist", async () => {
    await forEachFile('fake/dir', iterator);
    expect(iterator).toHaveBeenCalledTimes(0);
  });

  test('calls iterator for each file in a directory', async () => {
    await forEachFile('/test/dir', iterator);
    expect(iterator).toHaveBeenCalledTimes(3);
  });

  test('logs and throws on error', async () => {
    expect.assertions(2);

    iterator.mockImplementation(() => {
      throw new Error();
    });

    try {
      await forEachFile('/test/dir', iterator);
    } catch (err: any) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(err.toString()).toContain('Could not read from directory');
    }
  });
});
