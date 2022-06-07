import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'development';

export default (claims = {}) => {
  return jwt.sign(claims, secret);
};
