import { Request, Response } from 'express';
import { rm } from 'fs/promises';
import { getResourceById, getFilepathFromResource } from '@utils';

export default async function deleteTag(req: Request, res: Response) {
  try {
    const tag = await getResourceById('tag', req.params.id);

    if (!tag) {
      res.status(404).json({
        success: false,
        data: `Unable to find a tag with ID ${req.params.id}`,
      });
    } else {
      const filepath = getFilepathFromResource(tag);
      await rm(filepath);
      res.status(200).json({
        success: true,
        data: tag,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not delete tag',
    });
  }
}
