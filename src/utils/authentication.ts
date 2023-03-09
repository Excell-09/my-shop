import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface IPayload {
  userId: string;
}

const authentication = (req: NextApiRequest, res: NextApiResponse, next: any) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json('Authentication Invalid');
    return;
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as IPayload;
  req.userId = payload.userId;
  next();
  return;
};

export default authentication
