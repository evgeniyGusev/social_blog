import { ref } from 'vue';

import { ICurrentUser } from '@/interfaces/common_interfaces';

const user = ref<ICurrentUser | null>(null);
const isUserLoading = ref(false);

export default {
  user,
  isUserLoading,
};
