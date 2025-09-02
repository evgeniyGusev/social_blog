<template>
  <div class="user-state">
    <ui-confirm-dialog ref="dialog" :loading="isLogouLoading">
      <template #header> Выход </template>

      Вы действительно хотите выйти?
    </ui-confirm-dialog>

    <ui-dialog v-model="isModalOpen">
      <keep-alive>
        <component :is="currentModal" @change-mode="changeMode" @close="isModalOpen = false" />
      </keep-alive>
    </ui-dialog>

    <ui-spinner v-if="userStore.isUserLoading" height="2rem" width="2rem" />

    <template v-else-if="!userStore.currentUser">
      <ui-button @click="openSignUpDialog"> Создать аккаунт </ui-button>
      <ui-button template="secondary" @click="openSignInDialog">Войти</ui-button>
    </template>

    <template v-else>
      <span class="user-name">{{ userStore.currentUser.name }}</span>

      <img
        :src="getImage(userStore.currentUser.avatar)"
        :alt="userStore.currentUser.name"
        class="user-avatar"
      >

      <ui-button
        rounded
        template="tertiary"
        :disabled="isLogouLoading"
        :is-loading="isLogouLoading"
        @click="logOutHandler"
      >
        <UIcon name="i-custom-out-rounded" class="logout-icon" />
      </ui-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useCurrentUserStore } from '~/stores/current_user/';

import { AuthApi } from '@/lib/api/auth';
import { getImage } from '@/helpers/get_image';

import Toast from '@/components/ui/ui_toast/toast';

import SignInForm from '@/components/common/sign_in_form/SignInForm.vue';
import SignUpForm from '@/components/common/sign_up_form/SignUpForm.vue';
import UiConfirmDialog from '@/components/ui/ui_confirm_dialog/UiConfirmDialog.vue';

const router = useRouter();
const userStore = useCurrentUserStore();

const dialog = ref<InstanceType<typeof UiConfirmDialog> | null>();

const isModalOpen = ref(false);
const modalMode = ref<'signIn' | 'signUp'>('signIn');
const currentModal = computed(() => (modalMode.value === 'signIn' ? SignInForm : SignUpForm));
const isLogouLoading = ref(false);

function openSignInDialog() {
  modalMode.value = 'signIn';
  isModalOpen.value = true;
}

function openSignUpDialog() {
  modalMode.value = 'signUp';
  isModalOpen.value = true;
}

function changeMode(mode: 'signIn' | 'signUp'): void {
  modalMode.value = mode;
}

function logOutHandler() {
  dialog.value
    ?.open()
    .then(async () => {
      try {
        isLogouLoading.value = true;

        await AuthApi.signOut();

        Toast.success('Вы вышли из аккаунта');
        userStore.clearUser();

        await router.push({ name: 'guest' });
      } catch (e) {
        Toast.error('Не удалось выйти из аккаунта');
      } finally {
        isLogouLoading.value = false;
      }
    })
    .catch(() => false);
}
</script>

<style scoped lang="scss">
.user-state {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
  }

  .logout-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
