export interface IUserForPresent {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  friends: [string];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUsersByIdResponse {
  data: {
    access: boolean;
    user: IUserForPresent;
  };
}
