import getResourceById from '../get-resource-by-id';
import { vol } from 'memfs';

jest.mock('fs');
jest.mock('fs/promises');

describe('utils/getResourceById()', () => {
  const dateStr = JSON.parse(JSON.stringify(new Date()));
  let spy: jest.SpyInstance;

  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        './data/tags/12345.tag.json': JSON.stringify({
          id: '12345',
          name: 'test',
          created: dateStr,
        }),
        './data/posts/abcde.post.md': `---\ntitle: "Title"\ncreated: ${dateStr}\nid: abcde\n---\nTest\n`,
      },
      '/test',
    );

    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  test('returns null if no resource found', async () => {
    const result = await getResourceById('tag', 'gibberish');
    expect(result).toBeNull();
  });

  test('returns a tag', async () => {
    const tag = await getResourceById('tag', '12345');
    expect(tag.id).toEqual('12345');
    expect(tag.name).toEqual('test');
  });

  test('returns a post', async () => {
    const post = await getResourceById('post', 'abcde');
    expect(post.id).toEqual('abcde');
    expect(post.title).toEqual('Title');
  });

  test('logs and throws on error', async () => {
    expect.assertions(2);

    try {
      // @ts-ignore
      await getResourceById(null);
    } catch (err: any) {
      expect(err.toString()).toContain('resource by ID');
      expect(spy).toHaveBeenCalledTimes(1);
    }
  });
});
