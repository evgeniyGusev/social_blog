import axios from 'axios';
import { ICurrentUser } from '@/interfaces/common_interfaces';

function fetchCurrentUser(): Promise<ICurrentUser> {
  return axios.get('/api/auth/me');
}

export default {
  fetchCurrentUser,
};
