import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@src/utils';
import User, { UserType } from '../users/user.model';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        data: 'Authentication required',
      });
      return;
    }

    // TODO: probably some regex wizardry to do this better?
    const token = bearer.split('Bearer ')[1].trim();
    const decodedToken = verifyToken(token);

    if (typeof decodedToken === 'string' || !decodedToken.id) {
      res.status(401).json({
        success: false,
        data: 'Invalid token',
      });
      return;
    }

    const user = await User.getOne(decodedToken.id);

    if (!user) {
      res.status(401).json({
        success: false,
        data: 'Invalid user token',
      });
      return;
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
