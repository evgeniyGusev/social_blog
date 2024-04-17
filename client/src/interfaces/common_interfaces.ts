export interface ICurrentUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  favs: string[];
  friends: string[];
  invoices: {
    in: string[];
    out: string[];
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ICurrentUserResponse {
  data: {
    access: boolean;
    user: ICurrentUser;
  };
}

export interface INewUsersList {
  _id: string;
  name: string;
  avatar: string;
}

export interface INewUsersResponse {
  data: {
    success: boolean;
    data: INewUsersList[];
  };
}
