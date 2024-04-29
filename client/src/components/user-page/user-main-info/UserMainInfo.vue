<template>
  <div class="user-main-info">
    <ui-confirm-dialog ref="confirmDialog">
      <template #header> Удаление друга </template>

      Удалить "{{ props.user.name }}" из друзей?
    </ui-confirm-dialog>

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
          @click.stop="userActions.cancelInvoice(user._id)"
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
            @click.stop="userActions.acceptInvoice(user._id)"
          >
            Принять
          </ui-button>

          <ui-button
            size="small"
            template="secondary"
            aria-label="Отклонить заявку"
            :disabled="state.isUserStoreRequestLoading"
            :is-loading="state.isUserStoreRequestLoading"
            @click.stop="userActions.declineInvoice(user._id)"
          >
            Отклонить
          </ui-button>
        </div>
      </div>

      <ui-button
        v-else-if="!state.currentUser?.friends?.includes?.(user._id)"
        template="secondary"
        size="small"
        aria-label="Добавить в друзья"
        :disabled="state.isUserStoreRequestLoading"
        :is-loading="state.isUserStoreRequestLoading"
        @click.stop="userActions.addToFriends(user._id)"
      >
        <plus-icon class="user-button-icon" /> добавить в друзья
      </ui-button>

      <div v-else class="user-main-info-invoice-panel">
        <user-check-icon class="user-friend-icon" />

        <ui-button
          size="small"
          template="tertiary"
          aria-label="Отменить заявку"
          :disabled="state.isUserStoreRequestLoading"
          :is-loading="state.isUserStoreRequestLoading"
          @click.stop="removeFriend"
        >
          Удалить из друзей
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { getImage } from '@/helpers/get_image.ts';
import { CurrentUserStore } from '@/store/current_user/';

import { IUserForPresent } from '@/lib/api/curren_user/interfaces.ts';

import PlusIcon from '@/assets/icons/plus-rounded.svg?component';
import UserCheckIcon from '@/assets/icons/user-check.svg?component';
import UserRefreshIcon from '@/assets/icons/user-refresh.svg?component';

const props = defineProps<{ user: IUserForPresent }>();

const { state, actions: userActions } = CurrentUserStore;

const confirmDialog = ref();

function removeFriend(): void {
  confirmDialog.value.open().then(async () => {
    state.isUserStoreRequestLoading = true;

    await userActions.removeFromFriends(props.user._id);

    state.isUserStoreRequestLoading = false;
  });
}
</script>

<style scoped lang="scss">
.user-main-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem;

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
      width: 1.5rem;
      height: 1.5rem;
    }

    .user-button-icon {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
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
