import { nanoid } from 'nanoid';
import { vol } from 'memfs';
import saveResourceAsMarkdown from '../save-resource-as-markdown';
import { POST_SUFFIX } from '@constants';

jest.mock('fs/promises');

describe('utils/saveResourceAsMarkdown()', () => {
  let testPost: any;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON({ './data/posts/single-file.post.md': '"content"' }, '/test');

    testPost = {
      id: nanoid(),
      created: new Date(),
      title: 'Title',
      markdown: 'test',
    };
  });

  test('creates a file named by ID in a given directory', async () => {
    await saveResourceAsMarkdown(testPost);
    expect(vol.existsSync(`/test/data/posts/${testPost.id}${POST_SUFFIX}`)).toBe(true);
  });

  test('returns the created resource filepath', async () => {
    const filepath = await saveResourceAsMarkdown(testPost);
    expect(filepath).toEqual(`/test/data/posts/${testPost.id}${POST_SUFFIX}`);
  });

  test('logs and throws on error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect.assertions(2);

    try {
      // @ts-ignore
      await saveResourceAsMarkdown(null);
    } catch (err: any) {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(err.toString()).toContain('Could not write data');
    }
  });
});
