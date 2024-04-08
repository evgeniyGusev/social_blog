export interface ISignUpPayload {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface ISignUpResponse {
  success: boolean;
}
