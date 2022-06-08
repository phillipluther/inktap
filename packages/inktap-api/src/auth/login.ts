import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { UserType } from '../resources/user.model';
import { createToken } from '../utils';

export default async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        data: 'An email address and password are required to sign-in',
      });
      return;
    }

    const userMatch = await User.getMany({ email });
    const user = userMatch.length > 0 ? (userMatch[0] as UserType) : null;

    const invalidResponse = {
      success: false,
      data: `Invalid email + password combination`,
    };

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json(invalidResponse);
      return;
    }

    const token = createToken({
      id: user.id,
    });

    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Could not handle sign-in request',
    });
  }
};
