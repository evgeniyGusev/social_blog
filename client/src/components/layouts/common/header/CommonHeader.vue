<template>
  <header class="header">
    <div class="main-container">
      <div class="logo">
        <MainLogo class="main-logo" />

        <h1 class="main-title">ShareSpace</h1>
      </div>

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
  padding: 1rem 0;
  border-bottom: 1px solid $color-secondary;
  background-color: #fff;

  .main-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .main-title {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
  }
}
</style>
