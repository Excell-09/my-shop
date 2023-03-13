import axiosFetch from './axiosCreate';

const axiosPost = async <T>(endpoint: string, data: T) => {
  const response = await axiosFetch.post(endpoint, data);
  return response;
};

export default axiosPost;
