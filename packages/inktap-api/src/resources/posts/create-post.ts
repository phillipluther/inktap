import { NextFunction, Request, Response } from 'express';
import { Post as P, RequestData } from '@types';
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
    const dataObj: RequestData = {
      isValid: true,
    };

    if (parsed.success === true) {
      dataObj.result = parsed.data;
    } else {
      dataObj.isValid = false;
      dataObj.error = parsed.error;
    }

    req.data = dataObj;
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
