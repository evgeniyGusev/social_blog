<template>
  <CommonHeader />
  <slot></slot>
  <footer class="footer">footer</footer>
</template>

<script setup lang="ts">
import CommonHeader from '@/components/layouts/common/CommonHeader.vue';
</script>
