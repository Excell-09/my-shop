import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: 'https://my-shop-junchoi.vercel.app/api/v1',
});

export default axiosFetch;
