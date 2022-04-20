import { vol } from 'memfs';
import writeResourceFile from '../write-resource-file';

jest.mock('fs/promises');

describe('utils/writeResourceFile()', () => {
  let testPost: any;
  let testTag: any;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        './data/posts/single-file.json': 'content',
        './data/tags/single-file.json': '"content"',
      },
      '/test',
    );

    testPost = {
      id: '123a',
      title: 'Title',
      excerpt: 'little blurb',
      markdown: 'test',
    };

    testTag = {
      id: '123b',
      name: 'test',
    };
  });

  test('saves a resource as markdown', async () => {
    await writeResourceFile('post', testPost);
    expect(vol.existsSync(`/test/data/posts/${testPost.id}.json`)).toBe(true);
  });

  test('saves a resource as JSON', async () => {
    await writeResourceFile('tag', testTag);
    expect(vol.existsSync(`/test/data/tags/${testTag.id}.json`)).toBe(true);
  });

  test('returns the created resource filepath', async () => {
    const filepath = await writeResourceFile('post', testPost);
    expect(filepath).toEqual(`/test/data/posts/${testPost.id}.json`);
  });

  test('logs and throws on error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect.assertions(2);

    try {
      // @ts-ignore
      await writeResourceFile(null);
    } catch (err: any) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(err.toString()).toContain('Could not save');
    }
  });
});
