import user from '@/store/index';
import UserApi from '@/lib/api/user';
import { ICurrentUserResponse } from '@/interfaces/common_interfaces.ts';

export default async function checkAuth(): Promise<boolean> {
  if (!user.value) {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const { data }: ICurrentUserResponse = await UserApi.fetchCurrentUser();

        if (data.access) {
          user.value = data.user;
        }

        return true;
      } catch (e) {
        console.warn(e);
        return false;
      }
    }

    return false;
  } else {
    return true;
  }
}
