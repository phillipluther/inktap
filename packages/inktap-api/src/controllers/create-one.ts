import { Request, Response } from 'express';
import { formatSchemaError } from '@src/utils';

export default async function createOne(req: Request, res: Response) {
  try {
    const { isValid, data, error } = req.resource;

    if (!isValid) {
      res.status(400).json({
        success: false,
        data: formatSchemaError(error),
      });
      return;
    }

    res.status(201).json({
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
      data: 'Could not create resource',
    });
  }
}
