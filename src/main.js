import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import jquery from 'jquery'; // froala所需
import VueFroala from 'vue-froala-wysiwyg'; // froala所需
window.jquery = window.$ = jquery; // froala所需
require('froala-editor/js/froala_editor.pkgd.min.js'); // froala所需
require('froala-editor/js/languages/zh_cn.js');
require('froala-editor/css/froala_editor.pkgd.min.css'); // froala所需
require('font-awesome/css/font-awesome.css'); // froala所需
require('froala-editor/css/froala_style.min.css'); // froala所需
Vue.use(VueFroala); // froala所需
Vue.use(iView);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
