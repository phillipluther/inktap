import { Request, Response } from 'express';
import { SingleResource } from '@types';
import { formatError, saveResource } from '@src/utils';

export default async function createOne(req: Request, res: Response) {
  try {
    if (!req.data) {
      res.status(400).json({
        success: false,
        data: 'Nothing to create',
      });
      return;
    }

    const { isValid, result, error } = req.data;

    if (isValid === true && result) {
      await saveResource(result as SingleResource);

      res.status(201).json({
        success: true,
        data: result,
      });
    } else {
      let errorData = 'Malformed request';

      if (error) {
        errorData = typeof error === 'string' ? error : formatError(error);
      }

      res.status(400).json({
        success: false,
        data: errorData,
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
