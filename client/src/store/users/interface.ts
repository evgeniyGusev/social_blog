import { INewUsersList } from '@/interfaces/common_interfaces.ts';

export interface IUsersState {
  newUsers: INewUsersList[];
  isNewUsersLoading: boolean;
}
