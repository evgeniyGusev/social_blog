import { useCurrentUserStore } from '@/store/current_user';

export default defineNuxtRouteMiddleware(async (to) => {
  // const currentUserStore = useCurrentUserStore();

  // if (!currentUserStore.currentUser) {
  //   try {
  //     await currentUserStore.getCurrentUser();
  //
  //     if (!currentUserStore.currentUser && to.path !== '/guest') {
  //       return navigateTo('/guest')
  //     }
  //   } catch (e) {
  //      if (to.path !== '/guest') {
  //        return navigateTo('/guest');
  //      }
  //   }
  // }
})
