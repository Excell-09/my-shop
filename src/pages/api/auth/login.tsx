import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser, IUserInput } from '../../../../typings';
import UserModels from '@/models/UserModels';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import apiLimiter from '@/utils/apiLimiter';
import createJWT from '@/utils/createJwt';
import attachCookie from '@/utils/attachCookie';
import comparePassword from '@/utils/comparePassword';

const router = createRouter<NextApiRequest, NextApiResponse<IUser | string>>();

router
  .use(expressWrapper(cors()))
  .use(apiLimiter)
  .post(async (req, res) => {
    let { email, password }: IUserInput = req.body;
    email = email.toLowerCase();

    if (!email || !password) {
      res.status(401).json('Please Provide Your Input!');
      return;
    }

    let isUser = null;

    try {
      isUser = await UserModels.findOne({ email }).select('+password');

      if (!isUser) {
        res.status(400).json('User Not Found!');
        return;
      }

      const passwordCompared = await comparePassword(isUser.password, password);
      if (!passwordCompared) {
        res.status(400).json('User Not Found!');
        return;
      }

      isUser.password = undefined;
      const token = createJWT(isUser._id);
      attachCookie(res, token);
    } catch (error) {
      res.status(400).json(error as string);
      return;
    }
    res.status(201).json(isUser);
  });

export default router.handler();
