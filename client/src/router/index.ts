import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/guest',
      name: 'guest',
      component: () => import('@/pages/GuestPage.vue'),
    },
  ],
});

export default router;
