<template>
  <section class="post">
    <img v-if="post.poster" :src="post.poster" alt="post.title" class="post-img" />

    <router-link class="post-link" :to="{ name: 'post-id', params: { id: post._id } }">
      <h2 class="post-title">{{ post.title }}</h2>
    </router-link>

    <div class="post-author">
      <user-icon class="post-author__icon" />

      <span class="post-author__name">
        {{ post.author_name }}
      </span>
    </div>

    <div class="post-date">
      <clock-icon class="post-date__icon" />

      <span class="post-date__name">
        {{ post.createdAt }}
      </span>
    </div>

    <div class="post-body" v-html="post.body"></div>
  </section>
</template>

<script setup lang="ts">
import { IPost } from '@/lib/api/posts/interfaces.ts';

import UserIcon from '@/assets/icons/user.svg?component';
import ClockIcon from '@/assets/icons/clock.svg?component';

defineProps<{
  post: IPost;
}>();
</script>

<style scoped lang="scss">
.post {
  display: flex;
  flex-direction: column;

  .post-title {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: 700;
    transition: all 0.2s;

    &:hover {
      color: $color-secondary;
    }
  }

  .post-author,
  .post-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &__icon {
      width: 1rem;
      height: 1rem;
    }
  }

  .post-author {
    margin-bottom: 0.35rem;
  }

  .post-date {
    margin-bottom: 2rem;
  }
}
</style>
