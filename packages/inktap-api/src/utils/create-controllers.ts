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
      const resource = await model.getOne(req.params.id);
      const success = !!resource;

      let error;
      let status = 200;

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
      const collection = await model.getMany(req.params);

      res.status(200).json({
        success: true,
        data: collection,
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
      const updated = await model.updateOne(req.params.id, req.body);
      const success = !!updated;

      res.status(success ? 200 : 404).json({
        success,
        data: updated || formatError(`Could not find resource with ID ${req.params.id}`),
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
      const deleted = await model.deleteOne(req.params.id);
      const success = !!deleted;

      res.status(success ? 200 : 404).json({
        success,
        data: deleted || formatError(`Could not find resource with ID ${req.params.id}`),
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
