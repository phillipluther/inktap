import { NextFunction, Request, Response } from 'express';
import { getResourceById } from '@src/utils';
import { Post } from '@types';

export default async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const post: Post = await getResourceById('post', id);

    req.data = { isValid: !!post };

    if (post) {
      req.data.result = post;
    } else {
      req.data.error = `No post found with ID ${id}`;
    }

    next();
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal error getting post',
    });
  }
}
