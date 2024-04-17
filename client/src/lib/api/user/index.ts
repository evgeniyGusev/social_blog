import axios from 'axios';
import { ICurrentUserResponse, INewUsersResponse } from '@/interfaces/common_interfaces';
import { IUsersByIdResponse } from '@/lib/api/user/interfaces.ts';

function fetchCurrentUser(): Promise<ICurrentUserResponse> {
  return axios.get('/api/auth/me');
}

function fetchNewUsers(): Promise<INewUsersResponse> {
  return axios.get('/api/users/new');
}

function fetchUserById(id: string | string[]): Promise<IUsersByIdResponse> {
  return axios.get(`/api/users/${id}`);
}

function addUserToFriends(id: string | string[]): Promise<ICurrentUserResponse> {
  return axios.post(`/api/users/add_friend`, { id });
}

function removeUserFromFriends(id: string | string[]): Promise<ICurrentUserResponse> {
  return axios.post(`/api/users/remove_friend`, { id });
}

function cancelInvoice(id: string): Promise<ICurrentUserResponse> {
  return axios.get(`/api/users/cancel_friend_request/${id}`);
}

function acceptInvoice(id: string): Promise<ICurrentUserResponse> {
  return axios.get(`/api/users/accept_friend_request/${id}`);
}

function declineInvoice(id: string): Promise<ICurrentUserResponse> {
  return axios.get(`/api/users/decline_friend_request/${id}`);
}

export const UserApi = {
  fetchCurrentUser,
  fetchNewUsers,
  fetchUserById,
  addUserToFriends,
  removeUserFromFriends,
  cancelInvoice,
  acceptInvoice,
  declineInvoice,
};
