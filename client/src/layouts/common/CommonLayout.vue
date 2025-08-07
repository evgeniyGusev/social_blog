<template>
  <CommonHeader />

  <main class="main-container">
    <slot></slot>
  </main>

  <CommonFooter />
</template>

<script setup lang="ts">
import CommonHeader from '@/components/layouts/common/header/CommonHeader.vue';
import CommonFooter from '@/components/layouts/common/footer/CommonFooter.vue';
</script>
