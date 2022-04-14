import { Request, Response } from 'express';
import { getResourceById } from '@utils';

export default async function getTag(req: Request, res: Response) {
  try {
    const result = await getResourceById('tag', req.params.id);

    if (!result) {
      res.status(404).json({
        success: false,
        data: `Unable to find a tag with ID ${req.params.id}`,
      });
    } else {
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not get tag',
    });
  }
}
