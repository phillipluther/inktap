import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import dayjs from 'dayjs';
import { writeFile, mkdir } from 'fs/promises';
import matter from 'gray-matter';
import { Post as P } from '__types__';
import { CONTENT_DIR } from '__constants__';
import { createSlug, formatSchemaError } from '__utils__';
import { Post } from './post.model';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const { body: postData } = req;
    const id = nanoid();
    const published = new Date();
    const timeHash = dayjs(published).format('YYYY-MM-DD');

    const post: P = {
      ...postData,
      id,
      published,
      slug: postData.slug || createSlug(postData.title || ''),
    };

    const validation = Post.safeParse(post);

    if (!validation.success) {
      return res.status(400).send({
        status: 400,
        error: 'Invalid post data',
        message: formatSchemaError(validation.error),
      });
    }

    const postDir = path.join(CONTENT_DIR, `${timeHash}-${post.slug}`);
    const postFilepath = path.join(postDir, `${id}.md`);

    await mkdir(postDir, { recursive: true });

    const { markdown, ...frontmatter } = post;
    await writeFile(postFilepath, matter.stringify(markdown, frontmatter));

    return res.status(201).json(post);
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    return res.status(500).send({
      message: 'Internal API error',
    });
  }
}
