<template>
  <div class="user-state">
    <ui-dialog v-model="isModalOpen">
      <keep-alive>
        <component
          :is="currentModal"
          @change-mode="(mode: 'signIn' | 'signUp') => (modalMode = mode)"
          @close="isModalOpen = false"
        />
      </keep-alive>
    </ui-dialog>

    <template v-if="!user">
      <ui-button @click="openSignUpDialog"> Создать аккаунт </ui-button>
      <ui-button template="secondary" @click="openSignInDialog">Войти</ui-button>
    </template>

    <template v-else>
      <span class="user-name">{{ user.name }}</span>
      <img :src="user.avatar" :alt="user.name" class="user-avatar" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import user from '@/store';

import SignInForm from '@/components/common/sign_in_form/SignInForm.vue';
import SignUpForm from '@/components/common/sign_up_form/SignUpForm.vue';

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
</script>

<style scoped lang="scss">
.user-state {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .user-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
  }
}
</style>
