export interface ICurrentUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  favs: [];
  friends: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICurrentUserResponse {
  data: {
    access: boolean;
    user: ICurrentUser;
  };
}
