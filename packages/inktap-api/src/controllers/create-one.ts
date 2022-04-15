import { Request, Response } from 'express';

export default async function createOne(req: Request, res: Response) {
  try {
    const { resource } = req;

    res.status(201).json({
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
      data: 'Could not create resource',
    });
  }
}
