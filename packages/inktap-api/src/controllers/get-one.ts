import { Request, Response } from 'express';
import { SingleResource } from '@types';
import { RESOURCE_BY_ROUTE } from '@src/constants';
import { formatError, getResourceById } from '@src/utils';
import { ZodSchema } from 'zod';

const getOne = (Schema?: ZodSchema) => async (req: Request, res: Response) => {
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
      data: formatError('Could not retrieve resource'),
    });
  }
};

export default getOne;
