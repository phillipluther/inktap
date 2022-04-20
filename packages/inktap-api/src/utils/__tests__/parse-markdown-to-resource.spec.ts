import parseMarkdownToResource from '../parse-markdown-to-resource';
import Post from '@src/schemas/post.schema';

describe('utils/parseMarkdownToResource()', () => {
  const md = `---\ntitle: Test post\nexcerpt: A post for testing\ncreated: ${JSON.parse(
    JSON.stringify(new Date()),
  )}\nupdated:\n  - ${JSON.parse(JSON.stringify(new Date()))}\n---\ntest md\n`;

  test('returns a post', () => {
    expect(Post.parse(parseMarkdownToResource(md)));
  });
});
