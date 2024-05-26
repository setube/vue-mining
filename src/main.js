import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import { Popover, Tooltip, Statistic } from 'element-ui';

Vue.use(Vuex).use(Statistic).use(Popover).use(Tooltip);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');