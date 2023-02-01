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
                <p><b>First Name:</b> {{ Patient?.firstName }}</p>
                <p><b>Last Name:</b> {{ Patient?.lastName }}</p>
                <p><b> Birth Date:</b> {{ Patient?.dob }}</p>
                <p><b>Email:</b> {{ Patient?.email }}</p>
                <p><b>Blood Group:</b> {{ Patient?.bloodGroup }}</p>
                <v-card class="pa-2" outlined tile>
                  <b> Upcoming Appointments</b>
                  <div class="posts" v-if="upcomingAppointments">
                    <ul>
                      <li
                        v-for="appt in this.upcomingAppointments"
                        :key="appt.id"
                      >
                        <div id="post-div">
                          <p>{{ new Date(appt.dateTime).toLocaleString() }}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div v-else>You have no upcoming appointment book one</div>
                </v-card>
              </div>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg" class="tab-content">
              <div v-if="activeTab == 'Book Appointments'">
                <BookAppointment />
              </div>
              <div v-if="activeTab == 'Previous Diagnosis'">
                <ListDiganosis />
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
import { mapGetters, mapActions, mapState } from "vuex";
import axios from "axios";
import ListDiganosis from "./ListDiganosis.vue";

export default {
  name: "PatientHome",

  created() {
    console.log("created");
    this.GetPatient();
    this.GetUpcomingAppointments();
    console.log(this.Doctors);
  },

  components: {
    BookAppointment,
    ListDiganosis,
  },
  data: () => ({
    activeTab: "Book Appointments",
    links: ["Book Appointments", "Previous Diagnosis"],
    upcomingAppointments: null,
  }),

  methods: {
    ...mapActions(["GetPatient", "GetDoctors"]),

    switchTabs(payload) {
      this.activeTab = payload;
    },

    async GetUpcomingAppointments() {
      console.log("submit");

      try {
        console.log("try");
        let response = await axios.get("Patient/PatientUpcomingAppointments");
        if (response.data.length === 0) {
          this.upcomingAppointments = [];
        }else{
          this.upcomingAppointments = response.data;
          console.log("upcomingAppointments", this.upcomingAppointments);
        // this.$router.push("/doctors");
        }
      } catch (error) {
        console.log("error" + error);
        this.showError = true;
      }
    },
  },
  // watch: {
  //   Doctors: function (val) {
  //     console.log("watch");
  //     console.log(val);
  //   },
  //   immediate: true,
  //   deep: true,
  // },

  computed: {
    ...mapState(["patient", "doctors"]),
    ...mapGetters({ Patient: "StatePatient", Doctors: "StateDoctors" }),
    fullName: function () {
      return "Hello" + " " + "World";
    },
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
