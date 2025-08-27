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

export interface IActiveFriend {
  _id: string;
  name: string;
  avatar: string;
  email: string;
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

export interface IActiveFriendsResponse {
  data: {
    success: boolean;
    users: IActiveFriend[];
  };
}

export interface IInvoicesUsersResponse {
  data: {
    success: boolean;
    data: {
      usersIn: IActiveFriend[];
      usersOut: IActiveFriend[];
    };
  };
}
