import { Request, Response } from 'express';
import { formatError, writeResourceFile } from '@src/utils';
import { RESOURCE_BY_ROUTE } from '@src/constants';
import { ZodSchema } from 'zod';

const createOne = (Schema: ZodSchema) => async (req: Request, res: Response) => {
  try {
    const parsed = Schema.safeParse(req.body);
    const resourceType = RESOURCE_BY_ROUTE[req.baseUrl];

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        data: formatError(parsed.error),
      });

      return;
    }

    await writeResourceFile(resourceType, parsed.data);

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
