import axios from 'axios';

import { INewUsersResponse } from '@/interfaces/common_interfaces.ts';
import { IUsersByIdResponse } from '@/lib/api/users/interfaces.ts';

function fetchNewUsers(): Promise<INewUsersResponse> {
  return axios.get('/api/users/new');
}

function fetchUserById(id: string | string[]): Promise<IUsersByIdResponse> {
  return axios.get(`/api/users/${id}`);
}

export const UsersApi = {
  fetchNewUsers,
  fetchUserById,
};
