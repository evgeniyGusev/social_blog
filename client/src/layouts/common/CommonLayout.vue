<template>
  <CommonHeader />
  <main class="main-container" style="height: 3000px">
    <slot></slot>
  </main>
  <CommonFooter />
</template>

<script setup lang="ts">
import CommonHeader from '@/components/layouts/common/CommonHeader.vue';
import CommonFooter from '@/components/layouts/common/CommonFooter.vue';
</script>
