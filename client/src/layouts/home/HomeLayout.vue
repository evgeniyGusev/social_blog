<template>
  <section class="main-page-wrapper">
    <aside class="left-aside">
      <nav class="left-side-nav">
        <LeftSideMenuList :list="leftSideNavList" />
      </nav>

      <ui-button template="secondary" class="add-post-button">
        <PlusPostIcon class="add-post-icon" /> Добавить пост
      </ui-button>
    </aside>

    <router-view />

    <aside class="right-aside">
      <aside-new-users v-if="newUsers.length" :list="newUsers" />
    </aside>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import useNewUsers from '@/layouts/home/composables/use_new_users.ts';

import LeftSideMenuList from '@/layouts/home/components/LeftSideMenuList.vue';
import AsideNewUsers from '@/layouts/home/components/AsideNewUsers.vue';

import HouseIcon from '@/assets/icons/house.svg?component';
import ClipboardIcon from '@/assets/icons/clipboard.svg?component';
import UsersIcon from '@/assets/icons/users.svg?component';
import HeartIcon from '@/assets/icons/heart.svg?component';
import PlusPostIcon from '@/assets/icons/plus-post.svg?component';
import SettingsIcon from '@/assets/icons/settings.svg?component';

const { newUsers } = useNewUsers();

const leftSideNavList = ref([
  {
    title: 'Главная',
    icon: HouseIcon,
    link: { name: 'my-home' },
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
  {
    title: 'Настройки',
    icon: SettingsIcon,
    link: { name: 'my-settings' },
  },
]);
</script>

<style scoped lang="scss">
.main-page-wrapper {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;

  .left-aside {
    position: sticky;
    top: 89px;
    min-width: 170px;
    height: fit-content;

    .add-post-button {
      width: 100%;
      margin-top: 3rem;
      font-weight: 700;

      .add-post-icon {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.5rem;
      }
    }
  }

  .right-aside {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 200px;

    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 5rem;
      padding: 1rem;
      border-radius: $default-radius;
      border: 2px solid $color-secondary;
    }
  }
}
</style>
