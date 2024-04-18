import { CurrentUserStore } from '@/store/current_user/';

const { state, actions } = CurrentUserStore;

export default async function checkAuth(): Promise<boolean> {
  if (!state.currentUser) {
    try {
      await actions.getCurrentUser();

      return true;
    } catch (e) {
      return false;
    }
  } else {
    return true;
  }
}
