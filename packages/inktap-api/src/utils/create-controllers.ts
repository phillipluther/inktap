import { Request, Response } from 'express';
import { formatError } from '@src/utils';
import { ResourceModel } from '@types';

const createControllers = (model: ResourceModel) => ({
  async createOne(req: Request, res: Response) {
    try {
      const resource = await model.createOne(req.body);

      res.status(201).json({
        success: true,
        data: resource,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: formatError(err),
      });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const resource = model.getOne(req.params.id);

      let error;
      let status = 200;
      let success = !!resource ? resource : false;

      if (!success) {
        status = 404;
        error = formatError(`Could not find resource with ID ${req.params.id}`);
      }

      res.status(status).json({
        success,
        data: success ? resource : error,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: formatError(err),
      });
    }
  },
  async getMany(req: Request, res: Response) {
    try {
      res.status(200).json({
        success: true,
        data: 'got many!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: formatError(err),
      });
    }
  },
  async updateOne(req: Request, res: Response) {
    try {
      res.status(200).json({
        success: true,
        data: 'updated one!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: formatError(err),
      });
    }
  },
  async deleteOne(req: Request, res: Response) {
    try {
      res.status(200).json({
        success: true,
        data: 'deleted one!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: formatError(err),
      });
    }
  },
});

export default createControllers;
