export interface ISignUpPayload {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

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
