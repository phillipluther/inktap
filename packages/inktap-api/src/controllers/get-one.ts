import { Request, Response } from 'express';
import { formatError } from '@src/utils';

export default async function getOne(req: Request, res: Response) {
  try {
    const { data } = req;

    if (!data || !data.isValid) {
      res.status(404).json({
        success: false,
        data: formatError(data?.error || 'Could not get resource'),
      });

      return;
    }

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
      data: 'Could not retrieve resource',
    });
  }
}
