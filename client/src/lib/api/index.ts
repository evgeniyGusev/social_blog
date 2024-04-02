import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.access_token = localStorage.getItem('access_token') || '';
