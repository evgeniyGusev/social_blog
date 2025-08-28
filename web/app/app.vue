<template>
  <CommonHeader />

  <NuxtLayout :name>
    <NuxtPage />
  </NuxtLayout>

  <CommonFooter />
</template>

<script setup lang="ts">
import { useCurrentUserStore } from './store/current_user';

type LayoutName = 'common' | 'home';

const userStore = useCurrentUserStore();

const name = ref<LayoutName>(userStore.currentUser ? 'home' : 'common');
</script>
