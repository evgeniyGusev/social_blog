import { ref } from 'vue';

import { IUserStore } from '@/store/interfaces/user_store_interface';

const userStore = ref<IUserStore | null>(null);

export default userStore;
