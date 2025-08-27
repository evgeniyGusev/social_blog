<template>
  <section :class="['user-page', { 'is-user-loading': isUserLoading }]">
    <ui-spinner v-if="isUserLoading" width="5rem" height="5rem" />

    <div v-else-if="!user" class="error-user">Не удалось загрузить пользователя</div>

    <UserMainInfo v-else :user="user" />

    <hr />

    <div v-if="posts.length" class="user-posts">
      <post-item v-for="post in posts" :key="post._id" :post="post" />
    </div>

    <div v-else class="no-posts">Пока ничего не постил(а)</div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { IUserForPresent } from '@/lib/api/curren_user/interfaces.ts';
import { IPost } from '@/lib/api/posts/interfaces.ts';
import { UsersApi } from '@/lib/api/users';
import { PostsApi } from '@/lib/api/posts';

import UserMainInfo from '@/components/user-page/user-main-info/UserMainInfo.vue';
import PostItem from '@/components/posts/PostItem.vue';

const route = useRoute();

const user = ref<IUserForPresent | null>(null);
const isUserLoading = ref(false);

const posts = ref<IPost[] | []>([]);

async function getUser() {
  try {
    isUserLoading.value = true;

    const { data } = await UsersApi.fetchUserById(route.params.id);

    user.value = data.user;
  } catch (e) {
    /* empty */
  } finally {
    isUserLoading.value = false;
  }
}

async function getUserPosts() {
  try {
    const { data } = await PostsApi.fetchPostByUserId(String(route.params.id));

    posts.value = data.posts;
  } catch (e) {
    /* empty */
  }
}
onMounted(async () => {
  await getUser();
  await getUserPosts();
});
</script>

<style scoped lang="scss">
.user-page {
  &.is-user-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-posts {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  .no-posts {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
