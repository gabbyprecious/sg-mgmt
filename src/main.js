import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/modules/index.js';
import { createRouter, createWebHashHistory } from 'vue-router';

// import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader';

import GeneralHome from './components/Home.vue';
import PatientHome from './components/PatientView';
import Login from './components/Login.vue';
import PatientDoctorView from './components/PatientView/DoctorView.vue';
import DoctorView from './components/DoctorView';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import axios from 'axios';

loadFonts();

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('LogOut');
      return router.push('/login');
    }
  }
});

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://601a-178-215-194-55.eu.ngrok.io/';

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

const routes = [
  { path: '/', component: GeneralHome },
  { path: '/patient-home', component: PatientHome },
  { path: '/doctor', component: DoctorView },
  { path: '/test', component: PatientDoctorView },
  {
    path: '/login',
    component: Login,
    meta: { guest: true },
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

createApp(App).use(store).use(router).use(vuetify).mount('#app');
