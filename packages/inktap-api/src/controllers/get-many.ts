import { Request, Response } from 'express';

export default async function getMany(req: Request, res: Response) {
  try {
    const { data } = req;

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    //
    // logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not retrieve resources',
    });
  }
}
