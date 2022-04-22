import { Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { SingleResource } from '@types';
import { formatError, writeResourceFile, getResourceById } from '@src/utils';
import { RESOURCE_BY_ROUTE } from '@src/constants';

const updateOne = (Schema: ZodSchema) => async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resourceType = RESOURCE_BY_ROUTE[req.baseUrl];
    const resource: SingleResource = await getResourceById(resourceType, id);

    if (!resource) {
      res.status(404).json({
        success: false,
        data: formatError(`Could not find ${resourceType} with ID ${id}`),
      });

      return;
    }

    const parsed = Schema.safeParse({
      ...resource,
      ...req.body,
    });

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        data: formatError(parsed.error),
      });

      return;
    }

    parsed.data.updated.push(new Date());
    await writeResourceFile(resourceType, parsed.data);

    res.status(200).json({
      success: true,
      data: parsed.data,
    });
  } catch (err) {
    //
    // logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not update resource',
    });
  }
};

export default updateOne;
