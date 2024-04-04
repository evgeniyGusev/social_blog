<template>
  <header class="header">
    <div class="main-container">
      <MainLogo />
    </div>
  </header>
</template>

<script setup lang="ts">
import MainLogo from '@/assets/icons/full_logo.svg?component';
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  padding: 0.75rem 0;
  border-bottom: 1px solid $color-secondary;
  background-color: #fff;

  .main-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
