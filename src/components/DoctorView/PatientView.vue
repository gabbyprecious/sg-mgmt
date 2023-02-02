<template>
    <v-row>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <div class="posts" v-if="patientsDB.length">
            <ul>
              <li v-for="patients in this.patientsDB" :key="patients.id">

                <v-card class="pa-2" outlined tile>
                <p><b>First Name:</b> {{ patients.user.firstName }}</p>
                <p><b>Last Name:</b> {{ patients.user.lastName }}</p>
                <p><b> Birth Date:</b> {{ patients.user.dob }}</p>
                <p><b>Email:</b> {{ patients.user.email }}</p>
                <p><b>Blood Group:</b> {{ patients.bloodGroup }}</p>
                </v-card>
              </li>
            </ul>
          </div>
          <div v-else>You have no patients yet</div>
        </v-card>
      </v-col>
    </v-row>
  </template>
<script>
import "@vuepic/vue-datepicker/dist/main.css";
// import { mapGetters, mapActions } from 'vuex';
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "ListPatients",
  created() {
    console.log("created");
    this.GetPatients();
    console.log(this.patientsDB[0]);
  },
  mounted() {
    console.log("mounted");
    console.log(this.patientsDB[0]);
  },
  data() {
    return {
      patientsDB: [],
    };
  },
  methods: {
    ...mapActions(["GetDoctors"]),
    async GetPatients() {
      console.log("submit");

      try {
        console.log("try");
        let response = await axios.get("Doctor/ListAllPatients");
        if (response.data.length === 0) {
          this.patientsDB = [];
        }else{
          this.patientsDB = response.data;
          console.log("patientsDB", this.patientsDB);
          console.log(this.patientsDB[0]);
        // this.$router.push("/doctors");
        }

      } catch (error) {
        console.log("error" + error);
        this.showError = true;
      }
    },
  },
};
</script>