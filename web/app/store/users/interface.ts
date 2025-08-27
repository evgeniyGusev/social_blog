import { INewUsersList, IActiveFriend } from '@/interfaces/common_interfaces.ts';

export interface IUsersState {
  newUsers: INewUsersList[];
  isNewUsersLoading: boolean;
  activeFriends: IActiveFriend[];
  isActiveFriendsLoading: boolean;
  invoicesUsers: { usersIn: IActiveFriend[]; usersOut: IActiveFriend[] } | null;
  isInvoicesUsersLoading: boolean;
}
