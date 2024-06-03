<template>
  <section class="my-posts">
    <h1 class="title">Мои посты</h1>

    <hr />

    <ul class="my-posts-list">
      <li v-for="post in [...posts, ...posts, ...posts, ...posts]" :key="post._id" class="my-posts-item">
        <post-item :post="post" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { PostsApi } from '@/lib/api/posts';

import { IPost } from '@/lib/api/posts/interfaces.ts';

import Toast from '@/components/ui/ui_toast/toast.ts';
import PostItem from '@/components/posts/PostItem.vue';

const posts = ref<IPost[] | []>([]);
const isPostsLoading = ref(false);

async function getPosts(): Promise<void> {
  try {
    isPostsLoading.value = true;

    const { data } = await PostsApi.getUserPosts();

    posts.value = data.posts;
  } catch (e: any) {
    Toast.error(e.response.data.error);
  } finally {
    isPostsLoading.value = false;
  }
}

onMounted(getPosts);
</script>

<style scoped lang="scss">
.my-posts {
  height: 100%;

  .title {
    font-size: 2rem;
  }

  hr {
    margin: 1rem 0 2rem;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .my-posts-item {
      padding-bottom: 1rem;

      &:not(:last-child) {
        border-bottom: 1px solid $color-secondary;
      }
    }
  }
}
</style>
