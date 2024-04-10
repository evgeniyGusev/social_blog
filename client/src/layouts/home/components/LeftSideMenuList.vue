<template>
  <ul class="left-side-list">
    <li v-for="item in list" :key="item.title" class="left-side-item">
      <router-link :to="item.link" class="left-side-link">
        <component :is="item.icon" class="left-side-icon" />
        <span class="left-side-title">{{ item.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { VueElement } from 'vue';

defineProps<{
  list: { title: string; icon: VueElement; link: { name: string } }[];
}>();
</script>

<style scoped lang="scss">
.left-side-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style-type: none;

  .left-side-item {
    padding: 0.5rem 1rem;
    border-radius: $default-radius;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: $color-light;
    }

    .left-side-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: $color-secondary;

      .left-side-icon {
        width: 2rem;
        height: 2rem;
      }

      .left-side-title {
        font-weight: 700;
      }
    }
  }
}
</style>
