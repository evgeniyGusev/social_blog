<template>
  <div class="user-main-info">
    <img :src="getImage(user.avatar)" :alt="user.name" class="user-main-info-avatar" />

    <div class="user-main-info-body">
      <h3 class="user-main-info-name">{{ user.name }}</h3>
      <p class="user-main-info-email">{{ user.email }}</p>

      <ui-button v-if="!me?.friends?.includes?.(user._id)" template="tertiary" rounded @click="addToFriends">
        <user-plus-icon class="user-friend-icon" />
      </ui-button>

      <ui-button
        v-else
        template="tertiary"
        rounded
        @mouseenter="activeIcon = UserXMarkIcon"
        @mouseleave="activeIcon = UserCheckIcon"
      >
        <component :is="activeIcon" class="user-friend-icon" />
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { getImage } from '@/helpers/get_image.ts';
import { UserStore } from '@/store/user.ts';
import { UserApi } from '@/lib/api/user';

import { IUserForPresent } from '@/lib/api/user/interfaces.ts';

import Toast from '@/components/ui/ui_toast/toast.ts';
import UserPlusIcon from '@/assets/icons/user-plus.svg?component';
import UserCheckIcon from '@/assets/icons/user-check.svg?component';
import UserXMarkIcon from '@/assets/icons/user-xmark.svg?component';

const props = defineProps<{ user: IUserForPresent }>();

const { user: me } = UserStore;

const activeIcon = ref(UserCheckIcon);

async function addToFriends(): Promise<void> {
  try {
    const { data } = await UserApi.addUserToFriends(props.user._id);

    Toast.success('Пользователь добавлен в друзья');

    if (me.value) {
      me.value.friends = data.user.friends;
    }

    activeIcon.value = UserCheckIcon;
  } catch (e: any) {
    Toast.error(e);
  }
}
</script>

<style scoped lang="scss">
.user-main-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &-avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
    object-fit: cover;
  }

  &-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .user-friend-icon {
      width: 2rem;
      height: 2rem;
    }
  }

  &-name {
    font-size: 2rem;
    font-weight: 700;
  }

  &-email {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: $color-secondary;
  }
}
</style>
