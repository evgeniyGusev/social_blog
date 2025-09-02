<template>
  <CommonHeader />

  <NuxtLayout :name>
    <NuxtPage />
  </NuxtLayout>

  <CommonFooter />
</template>

<script setup lang="ts">
import { useCurrentUserStore } from '~/stores/current_user/';

type LayoutName = 'common' | 'home';

const userStore = useCurrentUserStore();

const name = computed<LayoutName>(() => {
  return userStore.currentUser ? 'home' : 'common';
});
</script>
