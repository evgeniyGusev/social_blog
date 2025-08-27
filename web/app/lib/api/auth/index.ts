import axios from 'axios';

import {
  ISignUpPayload,
  ISignUpResponse,
  ISignInPayload,
  ISignInResponse,
  ISignOutResponse,
} from '@/lib/api/auth/interfaces.ts';

function signUp(data: ISignUpPayload): Promise<ISignUpResponse> {
  return axios.post('/api/auth/sign_up', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

function signIn(data: ISignInPayload): Promise<ISignInResponse> {
  return axios.post('/api/auth/sign_in', data);
}

function signOut(): Promise<ISignOutResponse> {
  return axios.get('/api/auth/sign_out');
}

export const AuthApi = {
  signUp,
  signIn,
  signOut,
};
