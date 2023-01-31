//store/modules/auth.js

import axios from 'axios';

const state = {
  user: null,
  diagnosis: null,
  doctor: null,
  doctors: null,
  patient: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateDiagnosis: (state) => state.diagnosis,
  StateDoctor: (state) => state.doctor,
  StateDoctors: (state) => state.doctors,
  StatePatient: (state) => state.patient,
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

  async CreatePatient({ commit }, newPatient) {
    console.log('Patient', newPatient);
    let response = await axios.post('Doctor/CreatePatient', newPatient, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log('response', response.data);
    await commit('setUser', newPatient.get('email'));
  },

  async UploadDiagnosis({ commit }, newDiagnosis) {
    console.log('Diagnosis', newDiagnosis);
    let response = await axios.post('Doctor/UploadDiagnosis', newDiagnosis, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log('response', response.data);
    await commit('setUser', newDiagnosis.get('email'));
  },

  async GetDiagnosis({ commit }) {
    let response = await axios.get('diagnosis');
    commit('setPosts', response.data);
  },

  async GetDoctor({ commit }) {
    let response = await axios.get('/Doctor');
    console.log('response', response.data);
    commit('setDoctor', response.data);
  },
};
const mutations = {
  setUser(state, email) {
    state.user = email;
  },
  setDiagnosis(state, diagnosis) {
    state.diagnosis = diagnosis;
  },

  setDoctors(state, diagnosis) {
    state.diagnosis = diagnosis;
  },

  setDoctor(state, doctor) {
    state.doctor = doctor;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
