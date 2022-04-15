import { NextFunction, Request, Response } from 'express';
import { Post as P } from '@types';
import { createSlug, formatSchemaError, saveResourceAsMarkdown } from '@utils';
import Post from '@src/models/post.model';

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { body: postData } = req;
    const post: P = {
      ...postData,
      slug: postData.slug || createSlug(postData.title || ''),
    };

    const validation = Post.safeParse(post);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        data: formatSchemaError(validation.error),
      });
      return;
    }

    console.log('validation', validation);
    req.resource = post;
    next();
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
