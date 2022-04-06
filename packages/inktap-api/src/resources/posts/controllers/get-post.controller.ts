import { Request, Response } from 'express';
import getPost from '../get-post';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const post = await getPost(req.params.id);
    if (!post) {
      return res.status(404).end();
    }

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal error getting post' });
  }
}
