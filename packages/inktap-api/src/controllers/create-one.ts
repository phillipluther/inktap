import { Request, Response } from 'express';
import { formatSchemaError, saveResource } from '@src/utils';

export default async function createOne(req: Request, res: Response) {
  try {
    if (!req.resource) {
      res.status(400).json({
        success: false,
        data: 'Nothing to update',
      });
      return;
    }

    const { isValid, data, error } = req.resource;

    if (isValid === true && data) {
      await saveResource(data);

      res.status(201).json({
        success: true,
        data,
      });
    } else {
      res.status(400).json({
        success: false,
        data: error ? formatSchemaError(error) : 'Malformed resource',
      });
    }
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
