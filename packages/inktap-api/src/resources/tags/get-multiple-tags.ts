import { NextFunction, Request, Response } from 'express';
import { forEachFile } from '@src/utils';
import { TAGS_DIR } from '@src/constants';
import { Tag as T } from '@types';

export default async function getMultipleTags(req: Request, res: Response, next: NextFunction) {
  try {
    const tags: T[] = [];

    await forEachFile(TAGS_DIR, (json) => {
      tags.push(JSON.parse(json));
    });

    req.data = {
      isValid: true,
      result: tags,
    };

    next();
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal error getting posts',
    });
  }
}
