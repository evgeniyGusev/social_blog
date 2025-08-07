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
      <ui-button :is-loading="isPostSaving" :disabled="isPostSaving" @click="savePost">Опубликовать</ui-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { PostsApi } from '@/lib/api/posts';
import Toast from '@/components/ui/ui_toast/toast.ts';

const router = useRouter();

const title = ref('');
const post = ref('');
const isPostSaving = ref(false);

async function savePost(): Promise<void> {
  try {
    isPostSaving.value = true;

    const {
      data: { post: id },
    } = await PostsApi.savePost({
      title: title.value,
      body: post.value,
      poster: '',
    });

    Toast.success('Пост опубликован');

    await router.push({ name: 'post-id', params: { id } });
  } catch (e: any) {
    Toast.error(e);
  } finally {
    isPostSaving.value = false;
  }
}
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
