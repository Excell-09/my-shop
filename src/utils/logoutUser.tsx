import { deleteCache } from './cache';

const logoutUser = async () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  deleteCache('userCacheKey');
};

export default logoutUser;
