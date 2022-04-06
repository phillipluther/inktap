import getAllPosts from './get-all-posts';

describe('getAllPosts()', () => {
  test('returns an array of posts', async () => {
    const posts = await getAllPosts();

    expect(Array.isArray(posts)).toBe(true);
  });
});
