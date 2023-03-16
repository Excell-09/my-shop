const attachCookie = ({ res, token }) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.CLIENT_URL,
    path: '/',
    sameSite: 'Lax',
  });
};

export default attachCookie;
