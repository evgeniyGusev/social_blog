import axios from 'axios';

import { ISignUpPayload, ISignUpResponse, ISignInPayload, ISignInResponse } from '@/lib/api/auth/interfaces.ts';

async function signUp(data: ISignUpPayload): Promise<ISignUpResponse> {
  return axios.post('/api/auth/sign_up', data);
}

async function signIn(data: ISignInPayload): Promise<ISignInResponse> {
  return axios.post('/api/auth/sign_in', data);
}

const AuthApi = {
  signUp,
  signIn,
};

export default AuthApi;
