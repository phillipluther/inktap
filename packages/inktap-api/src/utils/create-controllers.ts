import { Request, Response } from 'express';
import { formatError } from '@src/utils';
import { ResourceModel } from '@types';

const createControllers = (model: ResourceModel) => ({
  createOne(req: Request, res: Response) {
    try {
      const resource = model.createOne(req.body);

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

  getOne(req: Request, res: Response) {
    try {
      res.status(200).json({
        success: true,
        data: 'got one!',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        data: formatError(err),
      });
    }
  },
  getMany(req: Request, res: Response) {
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
  updateOne(req: Request, res: Response) {
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
  deleteOne(req: Request, res: Response) {
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
