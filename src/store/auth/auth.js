//store/modules/auth.js

import axios from 'axios';

const state = {
  user: null,
  diagnosis: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateDiagnosis: (state) => state.diagnosis,
  StateUser: (state) => state.user,
};

const actions = {
  async LogIn({ commit }, User) {
    let response = await axios.post('User/authenticate', User, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    localStorage.setItem('token', response.data.token);
    await commit('setUser', User.get('email'));
  },

  async GetDiagnosis({ commit }) {
    let response = await axios.get('diagnosis');
    commit('setPosts', response.data);
  },
};
const mutations = {
  setUser(state, email) {
    state.user = email;
  },
  setDiagnosis(state, diagnosis) {
    state.diagnosis = diagnosis;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
