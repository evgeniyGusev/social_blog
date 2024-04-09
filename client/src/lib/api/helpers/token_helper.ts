import axios from 'axios';

export const setToken = (token: string) => {
  axios.defaults.headers.access_token = token;
};

export const removeToken = () => {
  axios.defaults.headers.access_token = '';
};
