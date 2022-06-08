import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'development';

export const createToken = (claims = {}) => {
  return jwt.sign(claims, secret);
};

export const verifyToken = (token: string) => jwt.verify(token, secret);
