<template>
  <CommonHeader />

  <NuxtLayout :name>
    <NuxtPage />
  </NuxtLayout>

  <CommonFooter />
</template>

<script setup lang="ts">
type LayoutName = 'common';

const name = ref<LayoutName>('common');
</script>
