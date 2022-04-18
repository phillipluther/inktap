import { NextFunction, Request, Response } from 'express';
import { forEachFile } from '@src/utils';
import { POSTS_DIR } from '@src/constants';
import { Post as P } from '@types';

export default async function getMultiplePosts(req: Request, res: Response, next: NextFunction) {
  try {
    const posts: P[] = [];

    await forEachFile(POSTS_DIR, (json) => {
      posts.push(JSON.parse(json));
    });

    req.data = {
      isValid: true,
      result: posts,
    };

    next();
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal error getting posts',
    });
  }
}
