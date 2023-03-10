import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: process.env.HOST + '/api',
});

const axiosGet = async <T>(endpoint: string): Promise<T> => {
  const { data } = await axiosFetch(endpoint);
  return data;
};

export default axiosGet;
