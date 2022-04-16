import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Post as P } from '@types';
import { createSlug } from '@utils';
import Post from '@src/models/post.model';

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { body: postData } = req;
    const post: P = {
      ...postData,
      slug: postData.slug || createSlug(postData.title || ''),
    };

    const parsed = Post.safeParse(post);
    const resource: {
      isValid: boolean;
      data?: P;
      error?: ZodError;
    } = {
      isValid: true,
    };

    if (parsed.success === true) {
      resource.data = parsed.data;
    } else {
      resource.isValid = false;
      resource.error = parsed.error;
    }

    req.resource = resource;
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
