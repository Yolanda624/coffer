import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [{
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
  },
  {
    path: '/css-world',
    name: 'css-world',
    component: () => import('@/views/CSS-WORLD/index.vue'),
    children: [{
      path: 'left-heavy-right-light',
      name: 'left-heavy-right-light',
      component: () => import('@/views/CSS-WORLD/left-heavy-right-light.vue')
    },
    {
      path: 'writing-mode-vertical',
      name: 'writing-mode-vertical',
      component: () => import('@/views/CSS-WORLD/writing-mode-vertical.vue')
    },
    {
      path: 'text-align-last-justify',
      name: 'text-align-last-justify',
      component: () => import('@/views/CSS-WORLD/text-align-last-justify.vue')
    },
    {
      path: 'not',
      name: 'not',
      component: () => import('@/views/CSS-WORLD/not.vue')
    },
    {
      path: 'overflow-x-auto',
      name: 'overflow-x-auto',
      component: () => import('@/views/CSS-WORLD/overflow-x-auto.vue')
    },
    {
      path: 'valid-invalid',
      name: 'valid-invalid',
      component: () => import('@/views/CSS-WORLD/valid-invalid.vue')
    },
    {
      path: 'attr-data',
      name: 'attr-data',
      component: () => import('@/views/CSS-WORLD/attr-data.vue')
    },
    {
      path: 'beauty-checked',
      name: 'beauty-checked',
      component: () => import('@/views/CSS-WORLD/beauty-checked.vue')
    },
    {
      path: 'juejin-login-css',
      name: 'juejin-login-css',
      component: () => import('@/views/CSS-WORLD/juejin-login-css.vue')
    }
    ]
  }, {
    path: '/froala',
    name: 'froala',
    component: () => import('@/views/froala/index.vue')
  },
  {
    path: '/es6',
    name: 'es6',
    component: () => import('@/views/ES6/index.vue'),
    children: [
      {
        path: 'async-await',
        name: 'async-await',
        component: () => import('@/views/ES6/async-await.vue')
      },
      {
        path: 'async-await-for',
        name: 'async-await-for',
        component: () => import('@/views/ES6/async-await-for.vue')
      }
    ]

  }
  ]
});
