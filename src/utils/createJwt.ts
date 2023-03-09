import jwt from 'jsonwebtoken';

const createJWT = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });
};

export default createJWT;
