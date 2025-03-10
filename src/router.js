import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  // scrollBehavior (to, from, savedPosition) {
  //   console.log('scrollBehavior', to, savedPosition)
  //   if (to.hash) {
  //     return {
  //       selector: to.hash
  //     }
  //   }
  // },

  // 为了配合qiankun主应用，此应用作为子项目之一
  base: window.__POWERED_BY_QIANKUN__ ? '/coffer' : '/',
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    // redirect: '/three'
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () => import('@/views/qrcode.vue')
  },
  {
    path: '/convert-canvas',
    name: 'convert-canvas',
    component: () => import('@/views/convert_canvas.vue')
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
    },
    {
      path: 'flex-margin',
      name: 'flex-margin',
      component: () => import('@/views/CSS-WORLD/flex-margin.vue')
    },
    {
      path: 'flex-grow',
      name: 'flex-grow',
      component: () => import('@/views/CSS-WORLD/flex-grow.vue')
    },
    {
      path: 'hover',
      name: 'hover',
      component: () => import('@/views/CSS-WORLD/hover.vue')
    },
    {
      path: 'css-flame',
      name: 'css-flame',
      component: () => import('@/views/CSS-WORLD/flame.vue')
    },
    {
      path: 'css-arc',
      name: 'css-arc',
      component: () => import('@/views/CSS-WORLD/css-arc.vue')
    },
    ]
  },
  {
    path: '/arc-area-shadow',
    name: 'arc-area-shadow',
    component: () => import('@/views/svg-draw/arc_area_shadow.vue')
  },
  {
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
  }, {
    path: '/water-fall',
    name: 'water-fall',
    component: () => import('@/views/water-fall/index.vue')
  }, {
    path: '/anchor',
    name: 'anchor',
    component: () => import('@/views/Anchor/index.vue')
  },
  {
    path: '/leader-line',
    name: 'leader-line',
    component: () => import('@/views/leader-line/index.vue')
  },
  {
    path: '/htmlToPdf',
    name: 'htmlToPdf',
    component: () => import('@/views/html-to-pdf/htmlToPdf.vue')
  },
  {
    path: '/amap',
    component: () => import('@/views/Maps/demo')
  },
  {
    path: '/hmap',
    component: () => import('@/views/Maps/highcharts-map-demo')
  },
  {
    path: '/three',
    component: () => import('@/views/three/index'),
  },
  {
    path: '/three/gltf',
    component: () => import('@/views/three/gltf'),
  },
  {
    path: '/three/dae',
    component: () => import('@/views/three/dae'),
  },
  {
    path: '/three/obj',
    component: () => import('@/views/three/obj'),
  },
  {
    path: '/three/car3d',
    component: () => import('@/views/three/car3d/index'),
  },
  {
    path: '/three/dianjimodel',
    component: () => import('@/views/three/dianjimodel'),
  },
  {
    path: '/three/show-text/a1',
    component: () => import('@/views/three/model-show-text/a1')
  },
  {
    path: '/three/show-text/a2',
    component: () => import('@/views/three/model-show-text/a2')
  },
  {
    path: '/three/show-text/a3',
    component: () => import('@/views/three/model-show-text/a3')
  },
  {
    path: '/three/show-text/a3/2',
    component: () => import('@/views/three/model-show-text/a3_2')
  },
  {
    path: '/three/show-text/a4',
    component: () => import('@/views/three/model-show-text/a4')
  },
  {
    path: '/three/vue-3d-loader',
    component: () => import('@/views/three/vue-3d-loader_demo/index')
  },
  {
    path: '/three/model-loader',
    component: () => import('@/views/three/model-loader-demo/index')
  },
  {
    path: '/three/sprite',
    component: () => import('@/views/three/sprite/index'),
    children: [
      {
        path: 'sprite1',
        component: () => import('@/views/three/sprite/sprite1')
      },
      {
        path: 'sprite-tree',
        component: () => import('@/views/three/sprite/sprite-tree')
      },
      {
        path: 'sprite-rain',
        component: () => import('@/views/three/sprite/sprite-rain')
      },
    ]
  },
  {
    path: '/comps/a-date-picker',
    component: () => import('@/views/comps-demo/date-picker-demo'),
  },
  {
    path: '/iframe',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/g6',
    component: () => import('@/views/G6/index.vue'),
  },
  {
    path: '/ledger',
    component: () => import('@/views/ledger/index.vue'),
  },
  ]
});
