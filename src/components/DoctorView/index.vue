<template>
  <v-app id="inspire">
    <v-app-bar app color="white" class="app-bar" flat>
      <v-tabs centered color="grey darken-1" class="app-tabs">
        <v-tab v-for="link in links" :key="link" @click="switchTabs(link)">
          {{ link }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg " min-height="268" class="profile">
              <v-avatar color="primary" size="71">ON</v-avatar>

              <div class="biodata">
                <p>First Name: {{ Doctor?.firstName }}</p>
                <p>Last Name: {{ Doctor?.lastName }}</p>
                <p>Birth Date: {{ Doctor?.dob }}</p>
                <p>Email: {{ Doctor?.email }}</p>
                <p>Specialty: {{ Doctor?.specialty }}</p>
              </div>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg" class="tab-content">
              <div v-if="activeTab == 'Create Patient'" id="error">
                <CreatePatient />
              </div>
              <div v-if="activeTab == 'Appointments'">
                <AppointmentView />
              </div>
              <div v-if="activeTab == 'Upload Diagnosis'">
                <UploadDiagnosis />
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CreatePatient from './CreatePatient.vue';
import AppointmentView from './AppointmentView.vue';
import UploadDiagnosis from './UploadDiagnosis.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DoctorViewContainer',
  created() {
    console.log('created');
    this.GetDoctor();
    console.log(this.Doctor);
  },

  components: {
    CreatePatient,
    AppointmentView,
    UploadDiagnosis,
  },
  data: () => ({
    activeTab: 'Create Patient',
    links: ['Create Patient', 'Appointments', 'Upload Diagnosis'],
  }),



  methods: {
    ...mapActions(['GetDoctor']),

    switchTabs(payload) {
      this.activeTab = payload;
    },
  },

  computed: {
    ...mapGetters({ Doctor: 'StateDoctor' }),
  },
};
</script>

<style>
#inspire {
  max-width: 1280px;
  margin: 0 auto;
  background-color: #f5f5f5;
}

.app-bar {
  margin: 0 12px;
}

.v-toolbar__content {
  justify-content: center;
}

.profile {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}

.v-avatar {
  margin: 0 auto;
}

.biodata {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tab-content {
  padding: 20px;
}
</style>
