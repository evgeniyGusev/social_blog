import user from '@/store/index';
import UserApi from '@/lib/api/user';
import { ICurrentUser } from '@/interfaces/common_interfaces.ts';

export default async function checkAuth(): Promise<boolean> {
  if (!user.value) {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const data: ICurrentUser = await UserApi.fetchCurrentUser();

        if (data) {
          user.value = data;
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
