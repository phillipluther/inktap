import getAllPosts from './get-all-posts';

describe('getAllPosts()', () => {
  beforeEach(() => {});

  test('returns an empty array if no posts', async () => {
    const posts = await getAllPosts({ postsDir: 'gibberish_dir' });
    expect(posts.length).toEqual(0);
  });

  test('returns an array of posts', async () => {
    const posts = await getAllPosts();
    expect(posts.length).toEqual(2);
  });
});
