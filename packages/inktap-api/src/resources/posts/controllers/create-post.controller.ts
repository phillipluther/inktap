import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Post as P } from '@types';
import { createSlug, formatSchemaError, saveResourceAsMarkdown } from '@utils';
import Post from '../post.model';

export default async function (req: Request, res: Response) {
  try {
    const { body: postData } = req;
    const id = nanoid();
    const post: P = {
      ...postData,
      id,
      created: new Date(),
      slug: postData.slug || createSlug(postData.title || ''),
    };

    const validation = Post.safeParse(post);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        data: formatSchemaError(validation.error),
      });
    } else {
      await saveResourceAsMarkdown(post);
      res.status(201).json({
        success: true,
        data: post,
      });
    }
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal error creating post',
    });
  }
}
