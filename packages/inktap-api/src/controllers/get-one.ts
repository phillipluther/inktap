import { Request, Response } from 'express';

export default async function getOne(req: Request, res: Response) {
  try {
    const { resource } = req;

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (err) {
    //
    // logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not retrieve resource',
    });
  }
}
