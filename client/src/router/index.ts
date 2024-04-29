import { createRouter, createWebHistory } from 'vue-router';

import checkAuth from '@/router/helpers/check_auth.ts';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/home/HomeLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'my-home',
          name: 'my-home',
          component: () => import('@/pages/user/HomePage.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'my-posts',
          name: 'my-posts',
          component: () => import('@/pages/user/MyPostsPage.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'my-friends',
          name: 'my-friends',
          component: () => import('@/pages/user/MyFriendsPage.vue'),
          meta: {
            requiresAuth: true,
          },
          children: [
            {
              path: 'all-friends',
              name: 'all-friends',
              component: () => import('@/pages/user/AllFriends.vue'),
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: 'friends-invoices',
              name: 'friends-invoices',
              component: () => import('@/pages/user/FriendsInvoices.vue'),
              meta: {
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: 'my-favorites',
          name: 'my-favorites',
          component: () => import('@/pages/user/MyFavoritesPage.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'my-settings',
          name: 'my-settings',
          component: () => import('@/pages/user/MySettingsPage.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'users/:id',
          name: 'users-id',
          component: () => import('@/pages/user/UserPage.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/guest',
      name: 'guest',
      component: () => import('@/pages/GuestPage.vue'),
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const isAuth = await checkAuth();

  if (!isAuth && to.meta.requiresAuth) {
    next('/guest');
  } else if (isAuth && (to.name === 'guest' || to.name === 'home')) {
    next({ name: 'my-home' });
  } else {
    next();
  }
});

export default router;
