import { vol } from 'memfs';
import readFile from '../read-file';

jest.mock('fs');
jest.mock('fs/promises');

describe('utils/readFile()', () => {
  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        './dir/file1.txt': 'ok',
      },
      '/test',
    );
  });

  test("returns null if file doesn't exists", async () => {
    const result = await readFile('fake/dir');
    expect(result).toBeNull();
  });

  test('returns file contents as a string', async () => {
    const result = await readFile('/test/dir/file1.txt');
    expect(result).toEqual('ok');
  });
});
