<template>
  <section class="friends-invoices">
    <div class="friends-invoices-buttons">
      <ui-button
        :template="invoicesType === 'usersIn' ? 'primary' : 'secondary'"
        size="small"
        @click="invoicesType = 'usersIn'"
      >
        Входящие
      </ui-button>

      <ui-button
        :template="invoicesType === 'usersOut' ? 'primary' : 'secondary'"
        size="small"
        @click="invoicesType = 'usersOut'"
      >
        Исходящие
      </ui-button>
    </div>

    <ui-spinner v-if="state.isInvoicesUsersLoading" width="2rem" height="2rem" />

    <div v-else-if="!state.invoicesUsers?.[invoicesType].length" class="friends-invoices-empty">
      {{ invoicesType === 'usersIn' ? 'Входящие' : 'Исходящие' }} заявки отсутствуют
    </div>

    <friends-list v-else :list="state.invoicesUsers?.[invoicesType]" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { UsersStore } from '@/store/users';

import FriendsList from '@/components/my-friends-page/friends-list/FriendsList.vue';

const { state, actions } = UsersStore;

const invoicesType = ref<'usersIn' | 'usersOut'>('usersIn');

onMounted(actions.getInvoicesUsers);
</script>

<style scoped lang="scss">
.friends-invoices {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  &-empty {
    text-align: center;
    font-size: 2rem;
  }
}
</style>
