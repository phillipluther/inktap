import { NextFunction, Request, Response } from 'express';
import { getResourceById, formatError } from '@src/utils';
import Post from '@src/models/post.model';
import { Post as P } from '@types';

export default async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
    const post: P = await getResourceById('post', id);

    if (post) {
      const parsed = Post.safeParse({ ...post, ...body });

      if (parsed.success) {
        req.data = {
          isValid: true,
          result: parsed.data,
        };
      } else {
        req.data = {
          isValid: false,
          error: formatError(parsed.error),
        };
      }
    } else {
      req.data = {
        isValid: false,
        error: `No post found with ID ${id}`,
      };
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
