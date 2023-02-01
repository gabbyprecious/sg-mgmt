//store/modules/auth.js

import axios from 'axios';

const state = {
  user: null,
  diagnosis: null,
  doctor: null,
  doctors: [],
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

  async GetDoctors({ commit }, specialty) {
    console.log('specialty', specialty)
    let response = await axios.get('/Patient/GetDoctorsBySpecialty?specialty=' + "cardio");
    console.log('response', response.data);
    commit('setDoctor', response.data);
    return response.data;
  },

  async GetPatient({ commit }) {
    let response = await axios.get('/Patient');
    console.log('response', response.data);
    commit('setPatient', response.data);
  },

  async SetAppointment({ commit }, appointment) {
    let response = await axios.post('Doctor/CreateAppointment', appointment, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log("response", response.data);
    await commit('setUser', appointment.get('email'));
  },
};
const mutations = {
  setUser(state, email) {
    state.user = email;
  },
  setDiagnosis(state, diagnosis) {
    state.diagnosis = diagnosis;
  },

  setDoctors(state, doctors) {
    // state.doctors = doctors;
    for (var i = 0; i < doctors.length; i++) {
      state.doctors.push(doctors[i]);
    }
    // Object.assign(state.doctors, doctors);
  },

  setDoctor(state, doctor) {
    state.doctor = doctor;
  },

  setPatient(state, patient) {
    state.patient = patient;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
