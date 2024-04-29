<template>
  <section class="friends-invoices">
    <div class="friends-invoices-in">
      <p class="friends-invoices-title">Входящие</p>

      <ui-spinner v-if="state.isInvoicesUsersLoading" width="2rem" height="2rem" />

      <div v-else-if="!state.invoicesUsers?.usersIn.length" class="all-friends-empty">У вас пока нет друзей</div>

      <friends-list v-else :list="state.invoicesUsers.usersIn" />
    </div>

    <div class="friends-invoices-out">
      <p class="friends-invoices-title">Исходящие</p>

      <ui-spinner v-if="state.isInvoicesUsersLoading" width="5rem" height="5rem" />

      <div v-else-if="!state.invoicesUsers?.usersOut.length" class="all-friends-empty">У вас пока нет друзей</div>

      <friends-list v-else :list="state.invoicesUsers.usersOut" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { UsersStore } from '@/store/users';

import FriendsList from '@/components/my-friends-page/friends-list/FriendsList.vue';

const { state, actions } = UsersStore;

onMounted(actions.getInvoicesUsers);
</script>

<style scoped lang="scss">
.friends-invoices {
  display: flex;
  gap: 0.5rem;

  &-in,
  &-out {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &-title {
    font-size: 1.5rem;
  }
}
</style>
