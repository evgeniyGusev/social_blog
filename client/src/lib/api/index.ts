import axios from 'axios';

export default function setAxios(): void {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}
