import matter from 'gray-matter';
import { Post as P } from '@types';
import Post from '../post.model';

export default function (post: P): string {
  Post.parse(post);

  const { markdown, markup, ...frontmatter } = post;
  return matter.stringify(markdown, frontmatter);
}
