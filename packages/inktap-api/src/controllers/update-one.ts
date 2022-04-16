import { Request, Response } from 'express';
import { SingleResource } from '@types';
import { formatError, saveResource } from '@src/utils';

export default async function updateOne(req: Request, res: Response) {
  try {
    if (!req.data?.isValid) {
      res.status(400).json({
        success: false,
        data: formatError(req.data?.error || 'Nothing to create'),
      });

      return;
    }

    const { result: updates } = req.data;
    await saveResource(updates as SingleResource);

    res.status(200).json({
      success: true,
      data: updates,
    });
  } catch (err) {
    //
    // logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not update resource',
    });
  }
}
