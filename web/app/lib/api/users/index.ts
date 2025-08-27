import axios from 'axios';

import { IActiveFriendsResponse, IInvoicesUsersResponse, INewUsersResponse } from '@/interfaces/common_interfaces.ts';
import { IUsersByIdResponse } from '@/lib/api/users/interfaces.ts';

function fetchNewUsers(): Promise<INewUsersResponse> {
  return axios.get('/api/users/new');
}

function fetchUserById(id: string | string[]): Promise<IUsersByIdResponse> {
  return axios.get(`/api/users/${id}`);
}

function fetchMyActiveFriends(): Promise<IActiveFriendsResponse> {
  return axios.get('/api/users/friends/all');
}

function fetchInvoicesUsers(): Promise<IInvoicesUsersResponse> {
  return axios.get('/api/users/invoices/all');
}

export const UsersApi = {
  fetchNewUsers,
  fetchUserById,
  fetchMyActiveFriends,
  fetchInvoicesUsers,
};
