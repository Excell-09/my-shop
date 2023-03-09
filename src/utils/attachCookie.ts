import type { NextApiResponse } from 'next';
import cookie from 'cookie';

const attachCookie = (res: NextApiResponse, token: string) => {
  const ONEDAY = 1000 * 60 * 60 * 24;

  const setCookie = cookie.serialize('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONEDAY),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', setCookie);
};

export default attachCookie;
