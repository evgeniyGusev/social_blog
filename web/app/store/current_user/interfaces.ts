import { ICurrentUser } from '@/interfaces/common_interfaces.ts';

export interface ICurrentUserState {
  currentUser: ICurrentUser | null;
  isUserLoading: boolean;
  isUserStoreRequestLoading: boolean;
}
