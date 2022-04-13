import { Request, Response } from 'express';
import path from 'path';
import { TAGS_DIR } from '@constants';
import { readFile } from '@utils';

export default async function getTag(req: Request, res: Response) {
  try {
    const result = await readFile(path.join(TAGS_DIR, `${req.params.id}.json`));

    if (!result) {
      res.status(404).json({
        success: false,
        data: `Unable to find a tag with ID ${req.params.id}`,
      });
    } else {
      res.status(200).json({
        success: true,
        data: JSON.parse(result),
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
