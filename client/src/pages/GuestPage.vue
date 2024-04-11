<template>
  <div class="guest-wrapper">
    <div class="guest-welcome">Добро пождаловать в <arrow-right-to-bottom-icon class="welcome-arrow-icon" /></div>

    <section class="guest-main">
      <logo-icon class="logo-icon" />

      <div class="main-description">
        <h1 class="guest-title">ShareSpace</h1>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import LogoIcon from '@/assets/icons/full_logo.svg?component';
import ArrowRightToBottomIcon from '@/assets/icons/arrow-right-to-bottom.svg?component';
</script>

<style scoped lang="scss">
.guest-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;

  .guest-welcome {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 4rem;
    font-weight: 700;

    .welcome-arrow-icon {
      width: 3rem;
      height: 3rem;
      transform: translateY(1rem);
    }
  }

  .guest-main {
    display: flex;
    align-items: center;
    gap: 2rem;

    .logo-icon {
      width: 24rem;
      height: 24rem;
    }

    .main-description {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .guest-title {
        font-size: 7rem;
        font-weight: 700;
      }
    }
  }
}
</style>
