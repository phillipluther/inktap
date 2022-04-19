import matter from 'gray-matter';
import { Post as P } from '@types';
import Post from '@src/models/post.model';

export default function (md: string): P {
  const parsedMd = matter(md, { excerpt: true });
  const post = {
    description: parsedMd.excerpt,
    ...(parsedMd.data as P),
    markdown: parsedMd.content,
  };

  Post.parse(post);
  return post;
}
