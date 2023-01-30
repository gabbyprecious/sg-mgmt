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
                <p>Name:</p>
                <p>Birth Date:</p>
                <p>Blood Group:</p>
                <p>Email:</p>
              </div>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg" class="tab-content">
              {{ activeTab }}
              <div v-if="activeTab == 'Book Appointments'">
                <BookAppointment />
              </div>
              <div v-if="activeTab == 'Previous Diagnosis'">
                <!-- <ListDiganosis /> -->
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BookAppointment from "./BookAppointment.vue";
import { mapGetters, mapActions } from "vuex";
// import ListDiganosis from './ListDiganosis.vue';

export default {
  name: "PatientHome",
  setup() {
    console.log("created");
    // this.GetDoctor();
    // console.log(this.Doctor);
  },
  components: {
    BookAppointment,
    // ListDiganosis,
  },
  data: () => ({
    activeTab: "Book Appointments",
    links: ["Book Appointments", "Previous Diagnosis"],
  }),

  methods: {
    ...mapActions(["GetDoctor"]),

    switchTabs(payload) {
      this.activeTab = payload;
    },
  },

  computed: {
    ...mapGetters({ Doctor: "StateDoctor" }),
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
