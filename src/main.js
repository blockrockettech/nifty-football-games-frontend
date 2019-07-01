import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue2Filters from 'vue2-filters';

Vue.use(BootstrapVue);
Vue.use(Vue2Filters);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mixins: [Vue2Filters.mixin],
  render: h => h(App)
}).$mount('#app');
