import { NextFunction, Request, Response } from 'express';
import { RequestData } from '@types';
import Tag from '@src/models/tag.model';

export default async function createTag(req: Request, res: Response, next: NextFunction) {
  try {
    const { body: tag } = req;

    const parsed = Tag.safeParse(tag);
    const requestData: RequestData = {
      isValid: parsed.success,
    };

    if (parsed.success === true) {
      requestData.result = parsed.data;
    } else {
      requestData.error = parsed.error;
    }

    req.data = requestData;
    next();
  } catch (err) {
    //
    // error handling
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal error creating tag',
    });
  }
}
