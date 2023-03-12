import { Register } from '../../typings';
import axiosFetch from './axiosCreate';

interface Data {}

const axiosPost = async <T>(endpoint: string, data: T) => {
  const response = await axiosFetch.post(endpoint, data);
  return response;
};

export default axiosPost;
