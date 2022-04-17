import { NextFunction, Request, Response } from 'express';
import { getResourceById } from '@src/utils';
import { Tag as T } from '@types';

export default async function getTag(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const tag: T = await getResourceById('tag', id);

    req.data = { isValid: !!tag };

    if (tag) {
      req.data.result = tag;
    } else {
      req.data.error = `No tag found with ID ${id}`;
    }

    next();
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal error getting tag',
    });
  }
}
