// import Vuex from 'vuex';
// import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
// import auth from './modules/auth';
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
    state () {
      return {
        count: 0
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    plugins: [createPersistedState()]
  })
  
