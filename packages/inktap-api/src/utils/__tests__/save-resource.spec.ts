import { vol } from 'memfs';
import saveResource from '../save-resource';

jest.mock('fs/promises');

describe('utils/saveResource()', () => {
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
      title: 'Title',
      markdown: 'test',
    };

    testTag = {
      name: 'test',
    };
  });

  test('saves a resource as markdown', async () => {
    await saveResource(testPost);
    expect(vol.existsSync(`/test/data/posts/${testPost.id}.json`)).toBe(true);
  });

  test('saves a resource as JSON', async () => {
    await saveResource(testTag);
    expect(vol.existsSync(`/test/data/tags/${testTag.id}.json`)).toBe(true);
  });

  test('returns the created resource filepath', async () => {
    const filepath = await saveResource(testPost);
    expect(filepath).toEqual(`/test/data/posts/${testPost.id}.json`);
  });

  test('logs and throws on error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect.assertions(2);

    try {
      // @ts-ignore
      await saveResource(null);
    } catch (err: any) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(err.toString()).toContain('Could not save');
    }
  });
});
