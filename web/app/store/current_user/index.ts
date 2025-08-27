import { defineStore } from 'pinia';

import { CurrentUserApi } from '@/lib/api/curren_user/';

import Toast from '@/components/ui/ui_toast/toast';

import type { ICurrentUserState } from './interfaces';
import type { ICurrentUser } from '@/interfaces/common_interfaces';


export const useCurrentUserStore = defineStore('currentUser', {
  state: (): ICurrentUserState => ({
    currentUser: null,
    isUserLoading: false,
    isUserStoreRequestLoading: false,
  }),

  actions: {
    clearUser(): void {
      this.currentUser = null;
    },

    refreshUser(payload: ICurrentUser): void {
      this.currentUser = payload;
    },

    async getCurrentUser(): Promise<void> {
      try {
        this.isUserLoading = true;

        const { data } = await CurrentUserApi.fetchCurrentUser();

        this.currentUser = data.user;

        this.isUserLoading = false;
      } catch (e: any) {
        this.isUserLoading = false;
        throw Error(e);
      }
    },

    async addToFriends(id: string): Promise<void> {
      try {
        this.isUserStoreRequestLoading = true;

        const { data } = await CurrentUserApi.addUserToFriends(id);

        Toast.success('Заявка на добавление в друзья отправлена');

        this.refreshUser(data.user);
      } catch (e: any) {
        Toast.error(e.response.data.error);
      } finally {
        this.isUserStoreRequestLoading = false;
      }
    },

    async removeFromFriends(id: string): Promise<void> {
      try {
        this.isUserStoreRequestLoading = true;

        const { data } = await CurrentUserApi.removeUserFromFriends(id);

        Toast.success('Пользователь удален из друзей');

        this.refreshUser(data.user);
      } catch (e: any) {
        Toast.error(e.response.data.error);
      } finally {
        this.isUserStoreRequestLoading = false;
      }
    },

    async cancelInvoice(id: string): Promise<void> {
      try {
        this.isUserStoreRequestLoading = true;

        const { data } = await CurrentUserApi.cancelInvoice(id);

        Toast.success('Заявка отменена');

        this.refreshUser(data.user);
      } catch (e: any) {
        Toast.error(e.response.data.error);
      } finally {
        this.isUserStoreRequestLoading = false;
      }
    },

    async acceptInvoice(id: string): Promise<void> {
      try {
        this.isUserStoreRequestLoading = true;

        const { data } = await CurrentUserApi.acceptInvoice(id);

        Toast.success('Заявка принята');

        this.refreshUser(data.user);
      } catch (e: any) {
        Toast.error(e.response.data.error);
      } finally {
        this.isUserStoreRequestLoading = false;
      }
    },

    async declineInvoice(id: string): Promise<void> {
      try {
        this.isUserStoreRequestLoading = true;

        const { data } = await CurrentUserApi.declineInvoice(id);

        Toast.success('Заявка отклонена');

        this.refreshUser(data.user);
      } catch (e: any) {
        Toast.error(e.response.data.error);
      } finally {
        this.isUserStoreRequestLoading = false;
      }
    },
  }
});
