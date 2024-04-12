<template>
  <div class="wrapper">
    <p class="dialog-head">Регистрация</p>

    <form class="form" @submit.prevent="submit">
      <ui-file-upload v-model="model.avatar" rounded class="file-input" accept="image/*">
        <ImageUserIcon width="2rem" height="2rem" />
        Выберите аватар
      </ui-file-upload>

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

      <ui-input
        v-model="model.confirmPassword"
        type="password"
        label="Пароль ещё раз"
        :state="$v.$dirty && $v.confirmPassword.$invalid ? 'error' : 'default'"
        :error="$v.confirmPassword.$errors[0]?.$message"
      />

      <ui-input
        v-model="model.name"
        label="Имя"
        :state="$v.$dirty && $v.name.$invalid ? 'error' : 'default'"
        :error="$v.name.$errors[0]?.$message"
      />

      <ui-button type="submit" size="large" :is-loading="isFormSending" :disabled="isFormSending">Отправить</ui-button>
    </form>

    <div class="dialog-footer">
      <span class="dialog-footer-text">Уже есть аккаунт?</span>

      <ui-button template="link" @click="$emit('change-mode', 'signIn')">Заходи</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, helpers } from '@vuelidate/validators';

import { AuthApi } from '@/lib/api/auth';
import { objectToFormData } from '@/helpers/object_to_form_data.ts';

import { IModel } from '@/components/common/sign_up_form/interfaces.ts';
import { ISignUpResponse } from '@/lib/api/auth/interfaces.ts';

import Toast from '@/components/ui/ui_toast/toast';
import ImageUserIcon from '@/assets/icons/image-user.svg?component';

const emit = defineEmits(['change-mode']);

const isFormSending = ref(false);

const model = reactive<IModel>({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  avatar: null,
});

const validationRules = {
  email: {
    required: helpers.withMessage('Обязательно для заполнения', required),
    email: helpers.withMessage('Некорректная почта', email),
  },
  password: {
    required: helpers.withMessage('Обязательно для заполнения', required),
    minLength: helpers.withMessage('Минимальная длина 6 символов', minLength(6)),
  },
  confirmPassword: {
    required: helpers.withMessage('Обязательно для заполнения', required),
    mustBeEqual: helpers.withMessage('Пароли должны совпадать', mustBeEqual),
  },
  name: { required: helpers.withMessage('Обязательно для заполнения', required) },
};

function mustBeEqual(value: string) {
  return model.password === value;
}

const $v = useVuelidate(validationRules, model);

async function submit(): Promise<void> {
  const isFormValid = await $v.value.$validate();

  if (isFormValid) {
    try {
      isFormSending.value = true;

      const payload = objectToFormData({
        email: model.email,
        password: model.password,
        name: model.name,
        avatar: model.avatar,
      });

      const { data }: ISignUpResponse = await AuthApi.signUp(payload);

      if (data.success) {
        Toast.success('Вы успешно зарегистрировались!');
        emit('change-mode', 'signIn');
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

    .file-input {
      width: 50%;
      align-self: center;
    }
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
