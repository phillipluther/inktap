import { Request, Response } from 'express';
import { rm } from 'fs/promises';
import { getFilepathFromResource, formatError } from '@src/utils';
import { SingleResource } from '@types';

export default async function deleteOne(req: Request, res: Response) {
  try {
    const { data } = req;

    if (!data || !data.result) {
      res.status(404).json({
        success: false,
        data: formatError(data?.error || 'Could not get resource'),
      });

      return;
    }

    const filepath = getFilepathFromResource(data.result as SingleResource);
    await rm(filepath);

    res.status(200).json({
      success: true,
      data: data.result,
    });
  } catch (err) {
    //
    // logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not delete resource',
    });
  }
}
