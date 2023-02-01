<template>
  <v-row>
    <v-col>
      <v-card class="pa-2" outlined tile>
        Previous Diagnosis
        <div class="posts" v-if="diagnosisDB.length">
          <ul>
            <li v-for="diagnosis in this.diagnosisDB" :key="diagnosis.id">
              <div id="post-div">
                <p>{{ diagnosis.result }}</p>
                <p>
                  by {{ diagnosis.doctor.firstName }}
                  {{ diagnosis.doctor.lastName }}
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
    console.log(this.diagnosisDB);
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
