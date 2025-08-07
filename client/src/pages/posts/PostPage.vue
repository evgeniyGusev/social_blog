<template>
  <div>
    <div v-if="isPostLoading" class="spinner-wrapper">
      <UiSpinner width="5rem" height="5rem" />
    </div>

    <PostItem v-else :post />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { IPost } from '@/lib/api/posts/interfaces.ts';
import { PostsApi } from '@/lib/api/posts';
import Toast from '@/components/ui/ui_toast/toast.ts';

import PostItem from '@/components/posts/PostItem.vue';

const route = useRoute();

const isPostLoading = ref(false);
const post = ref<IPost | null>(null);

async function getPost(): Promise<void> {
  try {
    isPostLoading.value = true;

    const { data } = await PostsApi.fetchPostById(String(route.params.id));

    post.value = data.post;
  } catch (e) {
    Toast.error('Не удалось загрузить пост');
  } finally {
    isPostLoading.value = false;
  }
}

onMounted(getPost);
</script>

<style scoped lang="scss">
.spinner-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
