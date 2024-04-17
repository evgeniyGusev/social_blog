<template>
  <div class="user-main-info">
    <img :src="getImage(user.avatar)" :alt="user.name" class="user-main-info-avatar" />

    <div class="user-main-info-body">
      <h3 class="user-main-info-name">{{ user.name }}</h3>
      <p class="user-main-info-email">{{ user.email }}</p>

      <div v-if="me?.invoices?.out?.includes?.(user._id)" class="user-main-info-invoice-panel">
        <user-refresh-icon class="user-friend-icon" />

        <ui-button
          size="small"
          template="tertiary"
          aria-label="Отменить заявку"
          :disabled="isRequestLoading"
          :is-loading="isRequestLoading"
          @click="cancelInvoice"
        >
          Отменить заявку
        </ui-button>
      </div>

      <div v-else-if="me?.invoices?.in?.includes?.(user._id)" class="user-main-info-invoice-panel invoice-in">
        <div class="user-main-info-invoice-in-head">Пользователь оставил заявку в друзья</div>

        <div class="invoice-in-buttons">
          <ui-button
            size="small"
            aria-label="Принять заявку"
            :is-loading="isRequestLoading"
            :disabled="isRequestLoading"
            @click="acceptInvoice"
          >
            Принять
          </ui-button>

          <ui-button
            size="small"
            template="secondary"
            aria-label="Отклонить заявку"
            :disabled="isRequestLoading"
            :is-loading="isRequestLoading"
            @click="declineInvoice"
          >
            Отклонить
          </ui-button>
        </div>
      </div>

      <ui-button
        v-else-if="!me?.friends?.includes?.(user._id)"
        template="tertiary"
        rounded
        aria-label="Добавить в друзья"
        :disabled="isRequestLoading"
        :is-loading="isRequestLoading"
        @click="addToFriends"
      >
        <user-plus-icon class="user-friend-icon" />
      </ui-button>

      <ui-button
        v-else
        template="tertiary"
        rounded
        aria-label="Удалить из друзей"
        :is-loading="isRequestLoading"
        :disabled="isRequestLoading"
        @mouseenter="activeIcon = UserXMarkIcon"
        @mouseleave="activeIcon = UserCheckIcon"
        @click="removeFromFriends"
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
import UserRefreshIcon from '@/assets/icons/user-refresh.svg?component';

const props = defineProps<{ user: IUserForPresent }>();

const { user: me } = UserStore;

const activeIcon = ref(UserCheckIcon);
const isRequestLoading = ref(false);

async function addToFriends(): Promise<void> {
  try {
    isRequestLoading.value = true;

    const { data } = await UserApi.addUserToFriends(props.user._id);

    Toast.success('Заявка на добавление в друзья отправлена');

    if (me.value) {
      me.value.invoices = data.user.invoices;
    }

    activeIcon.value = UserCheckIcon;
  } catch (e: any) {
    Toast.error(e.response.data.error);
  } finally {
    isRequestLoading.value = false;
  }
}

async function removeFromFriends(): Promise<void> {
  try {
    isRequestLoading.value = true;

    const { data } = await UserApi.removeUserFromFriends(props.user._id);

    Toast.success('Пользователь удален из друзей');

    if (me.value) {
      me.value.friends = data.user.friends;
    }
  } catch (e: any) {
    Toast.error(e.response.data.error);
  } finally {
    isRequestLoading.value = false;
  }
}

async function cancelInvoice(): Promise<void> {
  try {
    isRequestLoading.value = true;

    const { data } = await UserApi.cancelInvoice(props.user._id);

    Toast.success('Заявка отменена');

    if (me.value) {
      me.value.invoices = data.user.invoices;
    }
  } catch (e: any) {
    Toast.error(e.response.data.error);
  } finally {
    isRequestLoading.value = false;
  }
}

async function acceptInvoice(): Promise<void> {
  try {
    isRequestLoading.value = true;

    const { data } = await UserApi.acceptInvoice(props.user._id);

    Toast.success('Заявка принята');

    if (me.value) {
      me.value.invoices = data.user.invoices;
      me.value.friends = data.user.friends;
    }
  } catch (e: any) {
    Toast.error(e.response.data.error);
  } finally {
    isRequestLoading.value = false;
  }
}

async function declineInvoice(): Promise<void> {
  try {
    isRequestLoading.value = true;

    const { data } = await UserApi.declineInvoice(props.user._id);

    Toast.success('Заявка отклонена');

    if (me.value) {
      me.value.invoices = data.user.invoices;
      me.value.friends = data.user.friends;
    }
  } catch (e: any) {
    Toast.error(e.response.data.error);
  } finally {
    isRequestLoading.value = false;
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
