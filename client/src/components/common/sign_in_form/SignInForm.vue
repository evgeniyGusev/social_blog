<template>
  <div class="wrapper">
    <p class="dialog-head">Вход</p>

    <form class="form" @submit.prevent="submit">
      <ui-input
        v-model="model.email"
        v-input-focus:with-ui
        type="text"
        label="Электронная почта"
        :state="$v.$dirty && $v.email.$invalid ? 'error' : 'default'"
        :error="$v.email.$errors[0]?.$message"
      />
      <ui-input
        v-model="model.password"
        type="password"
        label="Пароль"
        :state="$v.$dirty && $v.password.$invalid ? 'error' : 'default'"
        :error="$v.password.$errors[0]?.$message"
      />
      <ui-button type="submit" size="large" :disabled="isFormSending" :is-loading="isFormSending">Войти</ui-button>
    </form>

    <div class="dialog-footer">
      <span class="dialog-footer-text">Нет аккаунта?</span>

      <ui-button template="link" @click="$emit('change-mode', 'signUp')">Регистрируйся</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

import { AuthApi } from '@/lib/api/auth';

import { ISignInResponse } from '@/lib/api/auth/interfaces.ts';

import Toast from '@/components/ui/ui_toast/toast';

const emit = defineEmits(['change-mode', 'close']);

const router = useRouter();

const isFormSending = ref(false);

const model = reactive({
  email: '',
  password: '',
});

const validationRules = {
  email: {
    required: helpers.withMessage('Обязательно для заполнения', required),
    email: helpers.withMessage('Некорректная почта', email),
  },
  password: {
    required: helpers.withMessage('Обязательно для заполнения', required),
  },
};

const $v = useVuelidate(validationRules, model);

async function submit(): Promise<void> {
  const isFormValid = await $v.value.$validate();

  if (isFormValid) {
    try {
      isFormSending.value = true;

      const { data }: ISignInResponse = await AuthApi.signIn(model);

      if (data.access) {
        emit('close');
        Toast.success('Добро пожаловать!');

        await router.push({ name: 'home' });
      }
    } catch (error: any) {
      Toast.error(error.response.data.error);
    } finally {
      isFormSending.value = false;
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;

  .dialog-head {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
