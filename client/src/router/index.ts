import { createRouter, createWebHistory } from 'vue-router';

import checkAuth from '@/router/helpers/check_auth.ts';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/user/HomePage.vue'),
      meta: {
        requiresAuth: true,
      },
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
  } else if (isAuth && to.name === 'guest') {
    next('/');
  } else {
    next();
  }
});

export default router;
