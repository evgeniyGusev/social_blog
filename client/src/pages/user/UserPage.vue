<template>
  <section :class="['user-page', { 'is-user-loading': isUserLoading }]">
    <ui-spinner v-if="isUserLoading" width="5rem" height="5rem" />

    <div v-else-if="!user" class="error-user">Не удалось получить пользователя</div>

    <UserMainInfo v-else :user="user" />
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { UserApi } from '@/lib/api/user';

import { IUserForPresent } from '@/lib/api/user/interfaces.ts';

import UserMainInfo from '@/components/user-page/user-main-info/UserMainInfo.vue';

const route = useRoute();

const user = ref<IUserForPresent | null>(null);
const isUserLoading = ref(false);

watchEffect(async () => {
  try {
    isUserLoading.value = true;

    const { data } = await UserApi.fetchUserById(route.params.id);

    user.value = data.user;
  } catch (e) {
    /* empty */
  } finally {
    isUserLoading.value = false;
  }
});
</script>

<style scoped lang="scss">
.user-page {
  &.is-user-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
