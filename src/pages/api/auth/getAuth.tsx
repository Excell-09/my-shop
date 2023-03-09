import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import UserModels from '@/models/UserModels';
import { IUser } from '../../../../typings';
import authentication from '@/utils/authentication';

const router = createRouter<NextApiRequest, NextApiResponse<string | IUser>>();

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req;
  try {
    const user = await UserModels.findOne({ _id: userId });
    if (!user) {
      res.status(404).json('User Not Found');
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error as string);
  }
};

router.use(expressWrapper(cors())).use(authentication).get(getUser);

export default router.handler();
