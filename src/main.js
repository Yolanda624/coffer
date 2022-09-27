import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import jquery from 'jquery'; // froala所需
import VueFroala from 'vue-froala-wysiwyg'; // froala所需

import './public-path';

import vue3dLoader from 'vue-3d-loader'
// console.log('888888', vue3dLoader)

window.jquery = window.$ = jquery; // froala所需
require('froala-editor/js/froala_editor.pkgd.min.js'); // froala所需
require('froala-editor/js/languages/zh_cn.js');
require('froala-editor/css/froala_editor.pkgd.min.css'); // froala所需
require('font-awesome/css/font-awesome.css'); // froala所需
require('froala-editor/css/froala_style.min.css'); // froala所需
Vue.use(VueFroala); // froala所需
Vue.use(iView);

Vue.use(vue3dLoader)

Vue.config.productionTip = false;
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');


/**
 * 需要将子应用打包成一个类库
 *  */
let instance = null; // 定义一个变量接收vue的实例

function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 如果是基座访问子应用（qiankun访问子应用）
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 如果是子应用独立运行的话，就直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

/**
 * 子应用的协议（固定）  导出三个Promise函数
 */

// 应用初始化的时候调用
export async function bootstrap(props) {
  console.log('===bootstrap===')
}

// 每次进入子应用的时候调用
// 子应用渲染的时候挂载 也可以把props传入子应用进行通讯
export async function mount(props) {
  console.log('==mount==', props)
  render(props)
}

// 切出或卸载的时候调用
// 子应用卸载的时候用destroy把实例卸载了
// instance.$destroy()
export async function unmount(props) {
  instance.$destroy();
  // instance.$el.innerHTML = '';
  instance = null;
}
