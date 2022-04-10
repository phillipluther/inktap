import postToFile from '../../../../resources/posts/utils/post-to-file';
import postData from '../../../_helpers/posts.mock';
import { POSTS_DIR } from 'constants';
import { existsSync, rmSync } from 'fs';
import path from 'path';

describe('postToFile()', () => {
  const post = postData[0];
  const id = post.id;
  const testFilepath = path.join(POSTS_DIR, `${id}.md`);

  afterEach(() => {
    if (existsSync(testFilepath)) {
      rmSync(testFilepath);
    }
  });

  test('it returns the give post', async () => {
    const afterPost = await postToFile(post);
    expect(afterPost).toEqual(post);
  });

  test('creates a new markdown file named with the ID', async () => {
    await postToFile(post);
    expect(existsSync(testFilepath)).toBe(true);
  });

  test('creates an ID if not provided', async () => {
    const newPost = { ...post };
    // @ts-ignore ... purposefully invalid!
    delete newPost.id;

    const writtenPost = await postToFile(newPost);
    rmSync(path.join(POSTS_DIR, `${writtenPost.id}.md`));

    expect(writtenPost.id).toBeDefined();
    expect(typeof writtenPost.id).toEqual('string');
  });
});
