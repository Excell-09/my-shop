import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: 'https://api-service-git-main-excell-09.vercel.app/api/v1',
});

export default axiosFetch;
