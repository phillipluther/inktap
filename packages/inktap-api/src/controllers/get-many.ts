import { Request, Response } from 'express';
import { formatError } from '@src/utils';

export default async function getMany(req: Request, res: Response) {
  try {
    const { data } = req;
    let resources = data?.result || [];

    if (data && !data.isValid) {
      res.status(400).json({
        success: false,
        data: formatError(data.error || 'Could not get resources'),
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: resources,
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
