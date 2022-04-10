import mdToPost from '../../../../resources/posts/utils/md-to-post';
import Post from '../../../../resources/posts/post.model';
import { POSTS_DIR } from 'constants';
import path from 'path';
import { readFileSync } from 'fs';

describe('mdToPost()', () => {
  const goodMd = readFileSync(path.join(POSTS_DIR, 'one-post.md')).toString();
  const badMd = '---\nbad:true\n---\nSuper invalid markdown';

  test('returns a Post object given markdown', () => {
    const post = mdToPost(goodMd);
    expect(Post.parse(post));
  });

  test('throws on an invalid post', () => {
    expect.assertions(1);

    try {
      mdToPost(badMd);
    } catch (err) {
      expect(err).not.toBeUndefined();
    }
  });
});
