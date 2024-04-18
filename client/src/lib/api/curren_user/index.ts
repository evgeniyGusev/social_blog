import axios from 'axios';

import { ICurrentUserResponse } from '@/interfaces/common_interfaces';

function fetchCurrentUser(): Promise<ICurrentUserResponse> {
  return axios.get('/api/auth/me');
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

export const CurrentUserApi = {
  fetchCurrentUser,
  addUserToFriends,
  removeUserFromFriends,
  cancelInvoice,
  acceptInvoice,
  declineInvoice,
};
