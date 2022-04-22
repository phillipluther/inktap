import { Request, Response } from 'express';
import { ResourceCollection } from '@types';
import { formatError, forEachFile } from '@src/utils';
import { RESOURCE_BY_ROUTE, RESOURCE_DIRS } from '@src/constants';
import { ZodSchema } from 'zod';

const getMany = (Schema?: ZodSchema) => async (req: Request, res: Response) => {
  try {
    const resources: ResourceCollection = [];
    const resourceType = RESOURCE_BY_ROUTE[req.baseUrl];
    const resourceDir = RESOURCE_DIRS[resourceType];

    await forEachFile(resourceDir, (json) => {
      resources.push(JSON.parse(json));
    });

    res.status(200).json({
      success: true,
      data: resources,
    });
  } catch (err) {
    //
    // logging
    //
    console.error(err);
    res.status(500).json({
      success: false,
      data: formatError('Could not retrieve resources'),
    });
  }
};

export default getMany;
