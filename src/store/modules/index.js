// import Vuex from 'vuex';
// import Vue from 'vue';
// import createPersistedState from "vuex-persistedstate";
import auth from '../auth/auth.js';
import { createStore } from 'vuex'

// // Load Vuex
// Vue.use(Vuex);
// // Create store
// export default new Vuex.Store({
//   modules: {
//     auth
//   },
//   plugins: [createPersistedState()]
// });

// Create a new store instance.
export const store = createStore({
  modules: {
    auth
  },
    // plugins: [createPersistedState()]
  })
  
