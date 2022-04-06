import { Request, Response } from 'express';
import getAllPosts from '../utils/get-all-posts';

export default async function (req: Request, res: Response): Promise<Response> {
  try {
    const posts = await getAllPosts();
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      data: 'Internal error getting all posts',
    });
  }
}
