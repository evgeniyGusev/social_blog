import axios from 'axios';

export default function setAxios(): void {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  axios.interceptors.request.use(config => {
    const methods = ['post', 'put', 'patch'];
  
    if (config.method && methods.includes(config.method?.toLowerCase())) {
      config.withCredentials = true;
    }
  
    return config;
  }, error => Promise.reject(error));
}
