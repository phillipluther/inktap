import path from 'path';
import { Request, Response } from 'express';
import { rm } from 'fs/promises';
import getPostById from '../utils/get-post-by-id';
import { POSTS_DIR } from '__constants__';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        data: `Post with ID \`${req.params.id}\` not found`,
      });
    }

    await rm(path.join(POSTS_DIR, `${req.params.id}.md`));
    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: 'Internal error getting all posts',
    });
  }
}
