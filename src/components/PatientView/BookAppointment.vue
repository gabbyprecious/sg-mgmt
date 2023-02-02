<template>
  <v-row>
    <v-col cols="12">
      <v-row flex-column>
        <v-col>
          <v-card class="px-2 py-5" outlined tile>
            <p class="mb-5">Search for Doctor</p>
            <form  ref="anyName" @submit.prevent="GetDoctors">
              <v-text-field
                v-model="specialty.value.value"
                :counter="10"
                :error-messages="specialty.errorMessage.value"
                label="Specialty"
              ></v-text-field>

              <v-btn class="me-4" type="submit"> Search </v-btn>

              <v-btn @click="handleReset"> clear </v-btn>
            </form>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-2" outlined tile v-if="doctorsDB">
            <b>Found Doctors</b>
            <div class="doctors" v-if="doctorsDB.length>0">
              <ul>
                <li v-for="doctor in this.doctorsDB" :key="doctor.id">
                  <div id="doctor-div">
                    <p>{{ doctor.user.firstName }}</p>
                    <v-btn rounded="pill" @click="GetDoctorInfo(doctor.id)">
                      Book Appointment
                    </v-btn>
                    <!-- <p>{{ doctor.user.firstName }}</p> -->
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>Oh no!!! No Result for this Specialty, search again</div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <v-col>
          <v-card class="pa-4" outlined tile v-if="doctor">
            <div class="biodata">
              <b>Doctor Bio Info</b>
              <p><b>First Name:</b> {{ doctor?.firstName }}</p>
              <p><b>Last Name:</b> {{ doctor?.lastName }}</p>
              <p><b>Email: </b>{{ doctor?.email }}</p>
              <p><b>Specialty:</b> {{ doctor?.specialty }}</p>
            </div>

            <div v-if="doctor.freeAppts">
              Set Appointment
              <ol class="list">
                <li
                  class="py-4"
                  v-for="appts in doctor.freeAppts"
                  :key="appts.id"
                >
                  <div id="post-div">
                    <p>{{ new Date(appts.dateTime).toLocaleString() }}</p>
                  </div>
                </li>
              </ol>

              <form ref="someName" @submit.prevent="setAppointment">
                <v-text-field
                  v-model="apptdate.value.value"
                  :counter="10"
                  :error-messages="apptdate.errorMessage.value"
                  label="Pick Number of appointment Date"
                ></v-text-field>

                <v-btn class="me-4" type="submit"> submit </v-btn>

                <v-btn @click="handleReset"> clear </v-btn>
              </form>
            </div>
            <div v-else>
              Oh no!!! Doctor {{ doctor.firstName }} does not have any free
              appointment
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { useField, useForm } from "vee-validate";
import "@vuepic/vue-datepicker/dist/main.css";
// import { mapGetters, mapActions } from 'vuex';
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "BookAppointment",
  data() {
    return {
      doctorsDB: null,
      doctor: null,
    };
  },
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        specialty(value) {
          if (value?.length >= 2) return true;

          return "Specialty needs to be at least 2 characters.";
        },

        apptdate(value) {
          if (value?.length == 1) return true;

          return "Appt date needs to a single integer.";
        },
      },
    });
    const specialty = useField("specialty");
    const apptdate = useField("apptdate");

    const submit = handleSubmit(() => {
      console.log("submit");
      this.GetDoctors();
    });

    return {
      specialty,
      apptdate,
      submit,
      handleReset,
    };
  },
  methods: {
    ...mapActions(["GetDoctors"]),
    async GetDoctors() {
      console.log("submit");

      try {
        console.log("try");
        let response = await axios.get(
          "Patient/GetDoctorsBySpecialty?specialty=" +
            this.specialty.value.value
        );
        this.doctorsDB = response.data;
        console.log("doctor", this.doctorsDB);
        this.$refs.anyName.reset();
        this.$router.push("/patient-home");
      } catch (error) {
        console.log("error" + error);
        this.showError = true;
      }
    },

    async GetDoctorInfo(doctor_id) {
      console.log("submit");

      try {
        console.log("try");
        let response = await axios.get(
          "Patient/GetDoctor?doctor_id=" + doctor_id
        );
        this.doctor = response.data;
        console.log("doctor", this.doctor);
      } catch (error) {
        console.log("error" + error);
      }
    },

    async setAppointment() {
      console.log("submit");

      try {
        var index = parseInt(this.apptdate.value.value);
        var appt_id = this.doctor.freeAppts[index - 1].id;
        console.log("appt", appt_id);
        let response = await axios.get(
          "Patient/SetApptDate?appt_id=" + appt_id
        );
        this.doctor = response.data;
        this.$refs.someName.reset();
        console.log("doctor", this.doctor);
      } catch (error) {
        console.log("error" + error);
      }
    },
  },
};
</script>
