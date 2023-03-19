import axiosFetch from './axiosCreate';
import { deleteCache } from './cache';

const logoutUser = async () => {
  await axiosFetch('/auth/logout');
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  deleteCache('userCacheKey');
};

export default logoutUser;
