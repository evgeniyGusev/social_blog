import axios from 'axios';

import { setToken } from '@/lib/api/helpers/token_helper.ts';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const accessToken = localStorage.getItem('access_token');

if (accessToken) {
  setToken(accessToken);
}
