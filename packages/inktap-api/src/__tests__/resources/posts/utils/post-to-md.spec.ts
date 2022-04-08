import postToMd from '../../../../resources/posts/utils/post-to-md';
import postData from '../../../_helpers/posts.mock';

describe('postToMd()', () => {
  const post = postData[0];
  let md: string;

  beforeEach(() => {
    md = postToMd(post);
  });

  test('returns a string', () => {
    expect(typeof md).toEqual('string');
  });

  test('file does not contain rendered markup', () => {
    const match = /markup\:/.test(md);
    expect(match).toBe(false);
  });
});
