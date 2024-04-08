import axios from 'axios';

import { ISignUpPayload, ISignUpResponse } from '@/lib/api/auth/interfaces.ts';

async function signUp(data: ISignUpPayload): Promise<ISignUpResponse> {
  return axios.post('/api/auth/sign_up', data);
}

const AuthApi = {
  signUp,
};

export default AuthApi;
