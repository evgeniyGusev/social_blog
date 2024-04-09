import axios from 'axios';
import { ICurrentUserResponse } from '@/interfaces/common_interfaces';

function fetchCurrentUser(): Promise<ICurrentUserResponse> {
  return axios.get('/api/auth/me');
}

export default {
  fetchCurrentUser,
};
