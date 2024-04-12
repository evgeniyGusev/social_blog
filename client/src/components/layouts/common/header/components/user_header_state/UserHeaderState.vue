<template>
  <div class="user-state">
    <ui-dialog v-model="isModalOpen">
      <keep-alive>
        <component :is="currentModal" @change-mode="changeMode" @close="isModalOpen = false" />
      </keep-alive>
    </ui-dialog>

    <ui-spinner v-if="isUserLoading" height="2rem" width="2rem" />

    <template v-else-if="!user">
      <ui-button @click="openSignUpDialog"> Создать аккаунт </ui-button>
      <ui-button template="secondary" @click="openSignInDialog">Войти</ui-button>
    </template>

    <template v-else>
      <span class="user-name">{{ user.name }}</span>
      <img :src="getImage(user.avatar)" :alt="user.name" class="user-avatar" />
      <ui-button rounded template="tertiary"><out-rounded class="logout-icon" @click="logOutHandler" /></ui-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { UserStore } from '@/store/user.ts';
import { AuthApi } from '@/lib/api/auth';
import { getImage } from '@/helpers/get_image.ts';

import SignInForm from '@/components/common/sign_in_form/SignInForm.vue';
import SignUpForm from '@/components/common/sign_up_form/SignUpForm.vue';
import UiSpinner from '@/components/ui/ui_spinner/UiSpinner.vue';
import Toast from '@/components/ui/ui_toast/toast.ts';

import OutRounded from '@/assets/icons/out-rounded.svg?component';

const router = useRouter();
const { user, isUserLoading } = UserStore;

const isModalOpen = ref(false);
const modalMode = ref<'signIn' | 'signUp'>('signIn');
const currentModal = computed(() => (modalMode.value === 'signIn' ? SignInForm : SignUpForm));

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

async function logOutHandler() {
  try {
    await AuthApi.signOut();

    Toast.success('Вы вышли из аккаунта');
    UserStore.clearUser();

    await router.push({ name: 'guest' });
  } catch (e) {
    Toast.error('Не удалось выйти из аккаунта');
  }
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
