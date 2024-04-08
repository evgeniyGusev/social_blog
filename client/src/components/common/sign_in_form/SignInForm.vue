<template>
  <div class="wrapper">
    <p class="dialog-head">Вход</p>

    <form class="form" @submit.prevent>
      <ui-input
        v-model="model.email"
        v-input-focus:with-ui
        type="text"
        label="Электронная почта"
        placeholder="жаль_не_изменить@mail.com"
      />
      <ui-input v-model="model.password" type="password" label="Пароль" placeholder="ОчЕнЬ_СлОжНыЙ_пАрОлЬ" />
      <ui-button type="submit" size="large">Войти</ui-button>
    </form>

    <div class="dialog-footer">
      <span class="dialog-footer-text">Нет аккаунта?</span>

      <ui-button template="link" @click="$emit('change-mode', 'signUp')">Регистрируйся</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

defineEmits(['change-mode']);

const model = reactive({
  email: '',
  password: '',
});
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
