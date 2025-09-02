import type { ICurrentUser } from '@/interfaces/common_interfaces';

export interface ICurrentUserState {
  currentUser: ICurrentUser | null;
  isUserLoading: boolean;
  isUserStoreRequestLoading: boolean;
}
