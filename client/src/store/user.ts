import { ref } from 'vue';

import { ICurrentUser } from '@/interfaces/common_interfaces';

const user = ref<ICurrentUser | null>(null);
const isUserLoading = ref(false);

function clearUser() {
  user.value = null;
}

export const UserStore = {
  user,
  isUserLoading,
  clearUser,
};
