import { NextFunction, Request, Response } from 'express';
import { getResourceById, formatError } from '@src/utils';
import Tag from '@src/models/tag.model';
import { Tag as T } from '@types';

export default async function updateTag(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
    const tag: T = await getResourceById('tag', id);

    if (tag) {
      const parsed = Tag.safeParse({ ...tag, ...body });

      if (parsed.success) {
        parsed.data.updated.push(new Date());
        req.data = {
          isValid: true,
          result: parsed.data,
        };
      } else {
        req.data = {
          isValid: false,
          error: formatError(parsed.error),
        };
      }
    } else {
      req.data = {
        isValid: false,
        error: `No tag found with ID ${id}`,
      };
    }

    next();
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal error getting post',
    });
  }
}
