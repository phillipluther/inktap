import { Request, Response } from 'express';
import getPostById from '../utils/get-post-by-id';
import Post from '../post.model';
import { Post as P } from '@types';
import { formatSchemaError, postToFile } from '__utils__';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        data: `Post with ID \`${req.params.id}\` not found`,
      });
    }

    const updatedPost = {
      ...post,
      ...req.body,
    } as P;

    const validation = Post.safeParse(updatedPost);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        data: formatSchemaError(validation.error),
      });
    }

    await postToFile(updatedPost);

    return res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      data: 'Internal error updating post',
    });
  }
}
