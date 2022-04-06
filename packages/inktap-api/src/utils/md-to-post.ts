import matter from 'gray-matter';
import { Post as P } from '__types__';
import Post from '../resources/posts/post.model';

export default function (md: string): P {
  const parsedMd = matter(md, { excerpt: true });
  const post = {
    summary: parsedMd.excerpt,
    ...parsedMd.data,
    markdown: parsedMd.content,
  } as P;

  Post.parse(post);
  return post;
}
