import axios from 'axios';

const axiosCreate = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default axiosCreate;
