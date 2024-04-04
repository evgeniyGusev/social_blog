export interface IUserStore {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  posts: [];
  friends: [];
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
