import { Request, Response } from 'express';
import getAllPosts from '../get-all-posts';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal error getting all posts' });
  }
}
