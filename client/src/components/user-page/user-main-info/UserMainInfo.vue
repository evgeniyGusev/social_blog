<template>
  <div class="user-main-info">
    <img :src="getImage(user.avatar)" :alt="user.name" class="user-main-info-avatar" />

    <div class="user-main-info-body">
      <h3 class="user-main-info-name">{{ user.name }}</h3>
      <p class="user-main-info-email">{{ user.email }}</p>

      <div v-if="state.currentUser?.invoices?.out?.includes?.(user._id)" class="user-main-info-invoice-panel">
        <user-refresh-icon class="user-friend-icon" />

        <ui-button
          size="small"
          template="tertiary"
          aria-label="Отменить заявку"
          :disabled="state.isUserStoreRequestLoading"
          :is-loading="state.isUserStoreRequestLoading"
          @click="userActions.cancelInvoice(user._id)"
        >
          Отменить заявку
        </ui-button>
      </div>

      <div
        v-else-if="state.currentUser?.invoices?.in?.includes?.(user._id)"
        class="user-main-info-invoice-panel invoice-in"
      >
        <div class="user-main-info-invoice-in-head">Пользователь оставил заявку в друзья</div>

        <div class="invoice-in-buttons">
          <ui-button
            size="small"
            aria-label="Принять заявку"
            :is-loading="state.isUserStoreRequestLoading"
            :disabled="state.isUserStoreRequestLoading"
            @click="userActions.acceptInvoice(user._id)"
          >
            Принять
          </ui-button>

          <ui-button
            size="small"
            template="secondary"
            aria-label="Отклонить заявку"
            :disabled="state.isUserStoreRequestLoading"
            :is-loading="state.isUserStoreRequestLoading"
            @click="userActions.declineInvoice(user._id)"
          >
            Отклонить
          </ui-button>
        </div>
      </div>

      <ui-button
        v-else-if="!state.currentUser?.friends?.includes?.(user._id)"
        template="tertiary"
        rounded
        aria-label="Добавить в друзья"
        :disabled="state.isUserStoreRequestLoading"
        :is-loading="state.isUserStoreRequestLoading"
        @click="addToFriends"
      >
        <user-plus-icon class="user-friend-icon" />
      </ui-button>

      <ui-button
        v-else
        template="tertiary"
        rounded
        aria-label="Удалить из друзей"
        :is-loading="state.isUserStoreRequestLoading"
        :disabled="state.isUserStoreRequestLoading"
        @mouseenter="activeIcon = UserXMarkIcon"
        @mouseleave="activeIcon = UserCheckIcon"
        @click="userActions.removeFromFriends(user._id)"
      >
        <component :is="activeIcon" class="user-friend-icon" />
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { getImage } from '@/helpers/get_image.ts';
import { CurrentUserStore } from '@/store/current_user/';

import { IUserForPresent } from '@/lib/api/curren_user/interfaces.ts';

import UserPlusIcon from '@/assets/icons/user-plus.svg?component';
import UserCheckIcon from '@/assets/icons/user-check.svg?component';
import UserXMarkIcon from '@/assets/icons/user-xmark.svg?component';
import UserRefreshIcon from '@/assets/icons/user-refresh.svg?component';

const props = defineProps<{ user: IUserForPresent }>();

const { state, actions: userActions } = CurrentUserStore;

const activeIcon = ref(UserCheckIcon);

function addToFriends(): void {
  userActions.addToFriends(props.user._id).then(() => {
    activeIcon.value = UserCheckIcon;
  });
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

  &-invoice-panel {
    display: flex;
    align-items: center;
    gap: 0.2rem;

    &.invoice-in {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;

      .user-main-info-invoice-in-head {
        padding: 0.1rem 0.5rem;
        border-radius: $default-radius;
        background-color: $color-green-light;
      }

      .invoice-in-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
}
</style>
