<template>
  <section class="my-friends-page">
    <div class="my-friends-page-tabs">
      <router-link
        v-for="tab in tabs"
        :key="tab.text"
        :to="tab.url"
        :class="['my-friends-page-tab', $route.name === tab.url.name && '_active']"
      >
        {{ tab.text }}
      </router-link>
    </div>

    <router-view />
  </section>
</template>

<script setup lang="ts">
const tabs: Array<{ text?: string; icon?: string; url: { name: string } }> = [
  {
    text: 'Все',
    url: { name: 'all-friends' },
  },
  {
    text: 'Заявки',
    url: { name: 'friends-invoices' },
  },
];
</script>

<style scoped lang="scss">
.my-friends-page {
  &-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid $color-primary;
  }

  &-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: $default-radius $default-radius 0 0;
    text-decoration: none;
    background-color: $color-light;
    transition: all 0.2s ease;

    &._active {
      background-color: $color-primary;
      cursor: default;
      pointer-events: none;
      color: #fff;
    }
  }
}
</style>
