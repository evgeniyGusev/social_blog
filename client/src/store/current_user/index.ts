import { reactive } from 'vue';

import { CurrentUserApi } from '@/lib/api/curren_user/';

import { ICurrentUserState } from './interfaces.ts';
import { ICurrentUser } from '@/interfaces/common_interfaces.ts';

import Toast from '@/components/ui/ui_toast/toast.ts';

const state = reactive<ICurrentUserState>({
  currentUser: null,
  isUserLoading: false,
  isUserStoreRequestLoading: false,
});

const actions = {
  clearUser(): void {
    state.currentUser = null;
  },

  refreshUser(payload: ICurrentUser): void {
    state.currentUser = payload;
  },

  async getCurrentUser(): Promise<void> {
    try {
      state.isUserLoading = true;

      const { data } = await CurrentUserApi.fetchCurrentUser();

      state.currentUser = data.user;

      state.isUserLoading = false;
    } catch (e: any) {
      state.isUserLoading = false;
      throw Error(e);
    }
  },

  async addToFriends(id: string): Promise<void> {
    try {
      state.isUserStoreRequestLoading = true;

      const { data } = await CurrentUserApi.addUserToFriends(id);

      Toast.success('Заявка на добавление в друзья отправлена');

      this.refreshUser(data.user);
    } catch (e: any) {
      Toast.error(e.response.data.error);
    } finally {
      state.isUserStoreRequestLoading = false;
    }
  },

  async removeFromFriends(id: string): Promise<void> {
    try {
      state.isUserStoreRequestLoading = true;

      const { data } = await CurrentUserApi.removeUserFromFriends(id);

      Toast.success('Пользователь удален из друзей');

      this.refreshUser(data.user);
    } catch (e: any) {
      Toast.error(e.response.data.error);
    } finally {
      state.isUserStoreRequestLoading = false;
    }
  },

  async cancelInvoice(id: string): Promise<void> {
    try {
      state.isUserStoreRequestLoading = true;

      const { data } = await CurrentUserApi.cancelInvoice(id);

      Toast.success('Заявка отменена');

      this.refreshUser(data.user);
    } catch (e: any) {
      Toast.error(e.response.data.error);
    } finally {
      state.isUserStoreRequestLoading = false;
    }
  },

  async acceptInvoice(id: string): Promise<void> {
    try {
      state.isUserStoreRequestLoading = true;

      const { data } = await CurrentUserApi.acceptInvoice(id);

      Toast.success('Заявка принята');

      this.refreshUser(data.user);
    } catch (e: any) {
      Toast.error(e.response.data.error);
    } finally {
      state.isUserStoreRequestLoading = false;
    }
  },

  async declineInvoice(id: string): Promise<void> {
    try {
      state.isUserStoreRequestLoading = true;

      const { data } = await CurrentUserApi.declineInvoice(id);

      Toast.success('Заявка отклонена');

      this.refreshUser(data.user);
    } catch (e: any) {
      Toast.error(e.response.data.error);
    } finally {
      state.isUserStoreRequestLoading = false;
    }
  },
};

export const CurrentUserStore = {
  state,
  actions,
};
