import { Request, Response } from 'express';
import getPostById from '../utils/get-post-by-id';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        data: `Post with ID \`${req.params.id}\` not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      data: 'Internal error getting post',
    });
  }
}
