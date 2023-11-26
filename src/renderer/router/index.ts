import { createRouter, createWebHistory } from 'vue-router';
import i18n from '@renderer/i18n';
import routes from '@renderer/router/routerList';

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

// router.beforeEach((to, from, next) => {
//   console.log('to', to, 'from', from, 'next', next);
//   next();
// });

// router.afterEach((to, from, next) => {
//   if (to.name) {
//     document.title = i18n.global.t(to.name.toString());
//   }
//   // next();
// });

export default router;
