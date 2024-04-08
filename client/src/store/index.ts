import { ref } from 'vue';

import { IUserStore } from '@/store/interfaces/user_store_interface';

const user = ref<IUserStore | null>(null);

export default user;
