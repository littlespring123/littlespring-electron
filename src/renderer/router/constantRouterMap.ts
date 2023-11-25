import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/Print', name: '打印', component: () => import('@renderer/views/Print.vue') },
  { path: '/Browser', name: '浏览器', component: () => import('@renderer/views/Browser.vue') },
];

export default routes;
