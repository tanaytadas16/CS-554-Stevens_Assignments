// import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

// Vue.use(BootstrapVue);
createApp(App).use(Quasar, quasarUserOptions).use(router).mount('#app');
