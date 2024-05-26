import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import { Popover, Tooltip, Statistic, Dialog, Button, Upload } from 'element-ui';

Vue.use(Vuex).use(Statistic).use(Popover).use(Tooltip).use(Dialog).use(Button).use(Upload);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');