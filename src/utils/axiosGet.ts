import axiosFetch from './axiosCreate';

const axiosGet = async <T>(endpoint: string): Promise<T> => {
  const { data } = await axiosFetch(endpoint);
  return data;
};

export default axiosGet;
