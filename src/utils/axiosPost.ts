import { Register } from '../../typings';
import axiosFetch from './axiosCreate';

const axiosPost = async (endpoint: string, { name, password, email }: Register) => {
  const response = await axiosFetch.post(endpoint, {
    name,
    password,
    email,
  });
  return response;
};

export default axiosPost;
