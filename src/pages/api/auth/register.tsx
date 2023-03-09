import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '@/mongoDb';
import { IUser, IUserInput } from '../../../../typings';
import UserModels from '@/models/UserModels';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import apiLimiter from '@/utils/apiLimiter';
import createJWT from '@/utils/createJwt';
import attachCookie from '@/utils/attachCookie';
import hashPassword from '@/utils/hashingPassword';

const router = createRouter<NextApiRequest, NextApiResponse<string>>();

router
  .use(expressWrapper(cors()))
  .use(apiLimiter)
  .post(async (req, res) => {
    let { name, email, password }: IUserInput = req.body;
    email = email.toLowerCase();

    if (!name || !email || !password) {
      res.status(401).json('Please Provide Your Input!');
      return;
    }

    try {
      const isUser = await UserModels.findOne<IUser>({ email });

      if (isUser) {
        res.status(400).json('Email Already Exits!');
        return;
      }

      const passwordHashed = await hashPassword(password);
      const userObject: IUserInput = { name, email, password: passwordHashed };
      await connectMongo();
      const newUser = await UserModels.create(userObject);
      const token = createJWT(newUser._id);
      attachCookie(res, token);
    } catch (error) {
      res.status(400).json(error as string);
      return;
    }
    res.status(201).json('User Created');
  });

export default router.handler();
