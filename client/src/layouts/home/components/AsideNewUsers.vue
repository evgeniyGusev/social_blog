<template>
  <section class="new-users">
    <p class="new-users-title">Новые пользователи:</p>
    <ul class="new-users-list">
      <li v-for="item in list" :key="item._id" class="new-users-item">
        <a href="#" class="new-users-link">
          <img :src="item.avatar" :alt="item.name" class="new-users-avatar" />
          <span class="new-users-name">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { INewUsersList } from '@/interfaces/common_interfaces.ts';

defineProps<{
  list: INewUsersList[] | [];
}>();
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
  }
}
</style>
