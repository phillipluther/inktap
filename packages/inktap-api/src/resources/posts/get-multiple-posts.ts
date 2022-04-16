import { NextFunction, Request, Response } from 'express';
import { forEachFile, parseMarkdownToResource } from '@src/utils';
import { POSTS_DIR } from '@src/constants';
import { Post } from '@types';

export default async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const posts: Post[] = [];

    await forEachFile(POSTS_DIR, (md) => {
      posts.push(parseMarkdownToResource(md));
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
