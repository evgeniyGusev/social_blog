<template>
  <section class="new-post">
    <h1 class="title">Напишите, о чём думаете</h1>

    <hr />

    <p class="post-title">Заголовок</p>

    <ui-input v-model="title" class="title-input" placeholder="Название поста" />

    <p class="body">Текст поста</p>

    <post-editor v-model="post" />

    <div class="buttons">
      <ui-button template="secondary" @click="$router.push({ name: 'my-home' })">Отменить</ui-button>
      <ui-button @click="console.table({ title, post })">Опубликовать</ui-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiInput from '@/components/ui/ui_input/UiInput.vue';

const title = ref('');
const post = ref('');
</script>

<style scoped lang="scss">
.new-post {
  height: 100%;

  .title {
    font-size: 2rem;
  }

  hr {
    margin: 1rem 0 2rem;
  }

  .post-title,
  .body {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .title-input {
    margin-bottom: 2rem;
  }

  .p-editor-container {
    :deep(.ql-container) {
      .ql-editor {
        min-height: 250px;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
}
</style>
