import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@src/utils';
import User, { UserType } from '../resources/user.model';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        success: false,
        data: 'Authentication required',
      });

      return;
    }

    const userId = verifyToken(token);

    if (!userId) {
      res.status(401).json({
        success: false,
        data: 'Invalid token',
      });
      return;
    }

    const user = await User.getOne(userId.toString());

    if (!user) {
      res.status(401).json({
        success: false,
        data: 'Invalid user token',
      });
    }

    req.user = user as UserType;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        data: 'Unable to authenticate request',
      })
      .end();
  }
};

export default authMiddleware;
