import axiosFetch from './axiosCreate';

const logoutUser = async () => {
  await axiosFetch('/auth/logout');
};

export default logoutUser;
