import { Request, Response } from 'express';
import path from 'path';
import { rm } from 'fs/promises';
import { formatError, getResourceById } from '@src/utils';
import { RESOURCE_BY_ROUTE, RESOURCE_DIRS } from '@src/constants';
import { SingleResource } from '@types';
import { ZodSchema } from 'zod';

const deleteOne = (Schema?: ZodSchema) => async (req: Request, res: Response) => {
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

    const filepath = path.join(RESOURCE_DIRS[resourceType], `${id}.json`);
    await rm(filepath);

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (err) {
    //
    // logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: formatError('Could not delete resource'),
    });
  }
};

export default deleteOne;
