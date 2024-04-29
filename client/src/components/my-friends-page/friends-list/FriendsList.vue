<template>
  <ul class="friends-list">
    <li
      v-for="friend in list"
      :key="friend._id"
      class="friends-item"
      @click.stop="$router.push({ name: 'users-id', params: { id: friend._id } })"
    >
      <user-main-info :user="friend" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { IActiveFriend } from '@/interfaces/common_interfaces.ts';

import UserMainInfo from '@/components/user-page/user-main-info/UserMainInfo.vue';

defineProps<{ list: IActiveFriend[] }>();
</script>

<style scoped lang="scss">
.friends-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.friends-item {
  border-radius: $default-radius;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: $color-ultra-light;
  }
}
</style>
