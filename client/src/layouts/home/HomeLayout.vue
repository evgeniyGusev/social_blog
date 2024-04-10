<template>
  <section class="main-page-wrapper">
    <aside class="left-aside">
      <nav class="left-side-nav">
        <LeftSideMenuList :list="leftSideNavList" />
      </nav>
    </aside>
    <slot></slot>
    <aside class="right-aside">
      <div class="box">Тут какая-то новость</div>
      <div class="box">Тут какое-то событие</div>
      <div class="box">А тут еще что-то</div>
      <div class="box">Здесь можно тоже что-нибудь</div>
      <div class="box">Ну и тут тоже</div>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import LeftSideMenuList from '@/layouts/home/components/LeftSideMenuList.vue';
import HouseIcon from '@/assets/icons/house.svg';
import ClipboardIcon from '@/assets/icons/clipboard.svg';
import UsersIcon from '@/assets/icons/users.svg';
import HeartIcon from '@/assets/icons/heart.svg';

const leftSideNavList = ref([
  {
    title: 'Главная',
    icon: HouseIcon,
    link: { name: 'home' },
  },
  {
    title: 'Мои посты',
    icon: ClipboardIcon,
    link: { name: 'my-posts' },
  },
  {
    title: 'Друзья',
    icon: UsersIcon,
    link: { name: 'my-friends' },
  },
  {
    title: 'Избранное',
    icon: HeartIcon,
    link: { name: 'my-favorites' },
  },
]);
</script>

<style scoped lang="scss">
.main-page-wrapper {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;

  .left-aside {
    position: sticky;
    top: 89px;
    min-width: 170px;
    height: fit-content;
  }

  .right-aside {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 5rem;
      padding: 1rem;
      border-radius: $default-radius;
      background-color: $color-secondary;
      color: #fff;
    }
  }
}
</style>
