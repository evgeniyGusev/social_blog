export type ISignUpPayload = FormData;

export interface ISignUpResponse {
  data: {
    success: boolean;
  };
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponse {
  data: {
    access: boolean;
    token: string;
  };
}

export interface ISignOutResponse {
  data: {
    access: boolean;
  };
}
