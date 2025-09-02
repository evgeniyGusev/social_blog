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

console.log(userStore);

const name = computed<LayoutName>(() => {
  return userStore.currentUser ? 'home' : 'common';
});

onMounted(() => {
  console.log(userStore);
})
</script>
