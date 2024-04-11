import { ref, Ref } from 'vue';

import { UserApi } from '@/lib/api/user/index.ts';

import { INewUsersList } from '@/interfaces/common_interfaces.ts';

const newUsers = ref<INewUsersList[]>([]);

export default function useNewUsers(): { newUsers: Ref<INewUsersList[] | []> } {
  UserApi.fetchNewUsers()
    .then(({ data }) => {
      newUsers.value = data.data;
    })
    .catch((error) => console.log(error));

  return {
    newUsers,
  };
}
