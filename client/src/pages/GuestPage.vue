<template>
  <div class="guest-wrapper">
    <welcome-block />

    <about-block />
  </div>
</template>

<script setup lang="ts">
import WelcomeBlock from '@/components/guest-page/WelcomeBlock.vue';
import AboutBlock from '@/components/guest-page/AboutBlock.vue';
</script>

<style scoped lang="scss">
.guest-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
