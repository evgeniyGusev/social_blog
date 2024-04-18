<template>
  <div class="user-state">
    <ui-confirm-dialog ref="dialog" :loading="isLogouLoading">
      <template #header>
        <div class="user-state-logout-header">Выход</div>
      </template>

      <div class="user-state-logout-body">Вы действительно хотите выйти?</div>
    </ui-confirm-dialog>

    <ui-dialog v-model="isModalOpen">
      <keep-alive>
        <component :is="currentModal" @change-mode="changeMode" @close="isModalOpen = false" />
      </keep-alive>
    </ui-dialog>

    <ui-spinner v-if="currentUserState.isUserLoading" height="2rem" width="2rem" />

    <template v-else-if="!currentUserState.currentUser">
      <ui-button @click="openSignUpDialog"> Создать аккаунт </ui-button>
      <ui-button template="secondary" @click="openSignInDialog">Войти</ui-button>
    </template>

    <template v-else>
      <span class="user-name">{{ currentUserState.currentUser.name }}</span>

      <img
        :src="getImage(currentUserState.currentUser.avatar)"
        :alt="currentUserState.currentUser.name"
        class="user-avatar"
      />

      <ui-button rounded template="tertiary" @click="logOutHandler">
        <out-rounded class="logout-icon" />
      </ui-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { CurrentUserStore } from '@/store/current_user/';
import { AuthApi } from '@/lib/api/auth';
import { getImage } from '@/helpers/get_image.ts';

import SignInForm from '@/components/common/sign_in_form/SignInForm.vue';
import SignUpForm from '@/components/common/sign_up_form/SignUpForm.vue';
import UiSpinner from '@/components/ui/ui_spinner/UiSpinner.vue';
import Toast from '@/components/ui/ui_toast/toast.ts';

import OutRounded from '@/assets/icons/out-rounded.svg?component';
import UiConfirmDialog from '@/components/ui/ui_confirm_dialog/UiConfirmDialog.vue';

const router = useRouter();
const { state: currentUserState, actions } = CurrentUserStore;

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
        actions.clearUser();

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

  &-logout-header {
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
  }

  &-logout-body {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
