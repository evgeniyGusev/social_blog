<template>
  <section class="all-friends">
    <ui-spinner v-if="state.isActiveFriendsLoading" width="5rem" height="5rem" />

    <div v-else-if="!state.activeFriends.length" class="all-friends-empty">У вас пока нет друзей</div>

    <friends-list v-else :list="state.activeFriends" />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { UsersStore } from '@/store/users';

import FriendsList from '@/components/my-friends-page/friends-list/FriendsList.vue';

const { state, actions } = UsersStore;

onMounted(actions.getActiveFriends);
</script>

<style scoped lang="scss">
.all-friends {
  :deep(.spinner_container) {
    margin: 0 auto;
  }

  &-empty {
    text-align: center;
    font-size: 3rem;
  }
}
</style>
