import { reactive } from 'vue';

import { UsersApi } from '@/lib/api/users/index.ts';

import { IUsersState } from '@/store/users/interface.ts';

import Toast from '@/components/ui/ui_toast/toast.ts';

const state = reactive<IUsersState>({
  newUsers: [],
  isNewUsersLoading: false,
});

const actions = {
  async getNewUsers(): Promise<void> {
    try {
      state.isNewUsersLoading = true;

      const { data } = await UsersApi.fetchNewUsers();

      state.newUsers = data.data;
      state.isNewUsersLoading = false;
    } catch (e: any) {
      Toast.error(e.response.data.error);
    }
  },
};

export const UsersStore = {
  state,
  actions,
};
