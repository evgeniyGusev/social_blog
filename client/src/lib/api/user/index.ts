import axios from 'axios';
import { ICurrentUserResponse, INewUsersResponse } from '@/interfaces/common_interfaces';

function fetchCurrentUser(): Promise<ICurrentUserResponse> {
  return axios.get('/api/auth/me');
}

function fetchNewUsers(): Promise<INewUsersResponse> {
  return axios.get('/api/users/new');
}

export const UserApi = {
  fetchCurrentUser,
  fetchNewUsers,
};
