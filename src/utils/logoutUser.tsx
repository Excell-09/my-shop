import { deleteCache } from './cache';

const logoutUser = async () => {
  let cookieValue =
    'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=my-shop-self.vercel.app;path=/;SameSite=Lax';

  if (window.location.protocol === 'https:') {
    cookieValue += ';Secure';
  }
  document.cookie = cookieValue;

  deleteCache('userCacheKey');
};

export default logoutUser;
