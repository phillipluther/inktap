import { Request, Response } from 'express';
import { formatError, saveResource } from '@src/utils';
import { ZodSchema } from 'zod';

const createOne = (Model: ZodSchema) => async (req: Request, res: Response) => {
  try {
    const parsed = Model.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        data: formatError(parsed.error),
      });

      return;
    }

    parsed.data.metadata.type = Model.description;

    await saveResource(parsed.data);
    res.status(201).json({
      success: true,
      data: parsed.data,
    });
  } catch (err) {
    //
    // TODO: logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: formatError('Could not create resource'),
    });
  }
};

export default createOne;
