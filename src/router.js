import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: () => import('@/views/qrcode.vue')
    },
    {
      path: '/photo-view',
      name: 'photo-view',
      component: () => import('@/views/photo-view.vue')
    },
    {
      path: '/split-panel',
      name: 'split-panel',
      component: () => import('@/views/split-panel.vue')
    }
  ]
});
