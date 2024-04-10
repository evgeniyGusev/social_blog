import User from '@/store/user.ts';
import UserApi from '@/lib/api/user';
import { ICurrentUserResponse } from '@/interfaces/common_interfaces.ts';

const { user, isUserLoading } = User;

export default async function checkAuth(): Promise<boolean> {
  if (!user.value) {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        isUserLoading.value = true;

        const { data }: ICurrentUserResponse = await UserApi.fetchCurrentUser();

        if (data.access) {
          user.value = data.user;
        }

        isUserLoading.value = false;
        return true;
      } catch (e) {
        console.warn(e);
        isUserLoading.value = false;
        return false;
      }
    }

    return false;
  } else {
    return true;
  }
}
