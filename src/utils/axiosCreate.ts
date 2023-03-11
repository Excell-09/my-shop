import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: process.env.HOST + '/api',
});

export default axiosFetch;
