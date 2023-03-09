import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import cookie from 'cookie';

const router = createRouter<NextApiRequest, NextApiResponse<string>>();

router.use(expressWrapper(cors())).get(async (req, res) => {
  const setCookie = cookie.serialize('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.setHeader('Set-Cookie', setCookie);
  res.status(200).json('User Logout');
});

export default router.handler();
