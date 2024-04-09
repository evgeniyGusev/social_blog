<template>
  <header class="header">
    <div class="main-container">
      <MainLogo class="main-logo" />

      <UserHeaderState />
    </div>
  </header>
</template>

<script setup lang="ts">
import MainLogo from '@/assets/icons/full_logo.svg?component';
import UserHeaderState from '@/components/layouts/common/header/components/user_header_state/UserHeaderState.vue';
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
