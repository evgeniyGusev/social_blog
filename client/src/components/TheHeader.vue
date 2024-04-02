<template>
  <header class="header">
    <section class="logo">
      <Logo />
    </section>

    <nav class="nav">
      <ul class="nav-list">
        <li v-for="item in NAV_LINKS" :key="item.name" class="nav-item">
          <a :href="`#${item.id}`" class="nav-link">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Logo from '@/assets/icons/eg-logo.svg?component';
import NAV_LINKS from '@/constants/NAV_LINKS.json';
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  .logo {
    width: 3rem;
    height: 3rem;
  }
}
</style>
