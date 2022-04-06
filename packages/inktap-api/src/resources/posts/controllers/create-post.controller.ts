import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import matter from 'gray-matter';
import { Post as P } from '__types__';
import { POSTS_DIR } from '__constants__';
import { createSlug, postToFile, formatSchemaError } from '__utils__';
import Post from '../post.model';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const { body: postData } = req;
    const id = nanoid();
    const published = new Date();

    const post: P = {
      ...postData,
      id,
      published,
      slug: postData.slug || createSlug(postData.title || ''),
    };

    const validation = Post.safeParse(post);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        data: formatSchemaError(validation.error),
      });
    }

    // await mkdir(POSTS_DIR, { recursive: true });
    // const postFilepath = path.join(POSTS_DIR, `${id}.md`);

    // const { markdown, ...frontmatter } = post;
    // await writeFile(postFilepath, matter.stringify(markdown, frontmatter));

    await postToFile(post);
    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    return res.status(500).json({
      success: false,
      data: 'Internal error creating post',
    });
  }
}
