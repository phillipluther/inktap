import getPostById from '../../../../resources/posts/utils/get-post-by-id';
import Post from '../../../../resources/posts/post.model';

describe('getPostById()', () => {
  test('reads a file and returns a Post', async () => {
    const post = await getPostById('one-post');
    expect(Post.parse(post));
  });

  test('returns null for an invalid post ID', async () => {
    const post = await getPostById('gibberish');
    expect(post).toBeNull();
  });
});
