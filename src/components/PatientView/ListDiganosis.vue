<template>
  <v-row>
    <v-col>
      <v-card class="pa-2" outlined tile>
        <b>Previous Diagnosis</b>
        <div class="posts" v-if="diagnosisDB.length">
          <ul>
            <li v-for="diagnosis in this.diagnosisDB" :key="diagnosis.id">
              <div id="post-div">
                <p>{{ diagnosis.result }}</p>
                <p>
                  by {{ diagnosis.doctor.user.firstName }}
                  {{ diagnosis.doctor.user.lastName }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>You have no diagnosis yet</div>
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
  name: "ListDiagnosis",
  created() {
    console.log("created");
    this.GetDiagnosis();
    console.log(this.diagnosisDB[0]);
  },
  mounted() {
    console.log("mounted");
    console.log(this.diagnosisDB[0]);
  },
  data() {
    return {
      diagnosisDB: [],
    };
  },
  methods: {
    ...mapActions(["GetDoctors"]),
    async GetDiagnosis() {
      console.log("submit");

      try {
        console.log("try");
        let response = await axios.get("Patient/ListDiagnosis");
        if (response.data.length === 0) {
          this.diagnosisDB = [];
        }else{
          this.diagnosisDB = response.data;
          console.log("diagnosisDB", this.diagnosisDB);
          console.log(this.diagnosisDB[0]);
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
