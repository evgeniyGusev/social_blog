<template>
  <section class="new-users">
    <p class="new-users-title">Новые пользователи:</p>

    <ui-spinner v-if="state.isNewUsersLoading" width="3rem" height="3rem" />

    <div v-else-if="!state.newUsers.length">Нет новых пользователей</div>

    <ul v-else class="new-users-list">
      <li v-for="item in state.newUsers" :key="item._id" class="new-users-item">
        <router-link :to="{ name: 'users-id', params: { id: item._id } }" class="new-users-link">
          <img
            :src="getImage(item.avatar)"
            :alt="item.name"
            :class="['new-users-avatar', { _scalable: item.avatar !== 'default.svg' }]"
          />
          <span class="new-users-name">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { getImage } from '@/helpers/get_image.ts';
import { UsersStore } from '@/store/users';

const {
  state,
  actions: { getNewUsers },
} = UsersStore;

onMounted(getNewUsers);
</script>

<style scoped lang="scss">
.new-users {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &-title {
    font-size: 1.3rem;
    font-weight: 700;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &-item {
    border-radius: $default-radius;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      ._scalable {
        transform: scale(1.5);
      }

      .new-users-name {
        text-decoration: underline;
        text-decoration-color: $color-primary;
      }
    }
  }

  &-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: $color-secondary;
  }

  &-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    transition: all 0.2s ease;
  }
}
</style>
