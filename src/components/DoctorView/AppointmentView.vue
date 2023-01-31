<template>
  <v-row>
    <v-col>
      <v-card class="pa-4 mb-3" outlined tile>
        Booked Appointments
        <div  v-if="Doctor.bookedAppts.length">
          <ul class="list">
            <li class="py-4" v-for="appts in Doctor.bookedAppts" :key="appts.id">
              <div id="post-div">
                <p>{{ new Date(appts.dateTime).toLocaleString() }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>Oh no!!! You don't have any booked appointment</div>
      </v-card>
      <v-card class="pa-4" outlined tile>
        Free Appointments Slots
        <div v-if="Doctor.freeAppts">
          <ul class="list">
            <li class="py-4" v-for="appts in Doctor.freeAppts" :key="appts.id">
              <div id="post-div">
                <p>{{ new Date(appts.dateTime).toLocaleString() }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>Oh no!!! You don't have any free appointment</div>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-2" outlined tile> Set Appointment Slots 

        Set Appointment Slots
                  <form @submit.prevent="submitApi">
                    <Datepicker v-model="date.value.value"></Datepicker>

                    <v-btn class="me-4" type="submit"> submit </v-btn>

                    <v-btn @click="handleReset"> clear </v-btn>
                  </form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { useField, useForm } from "vee-validate";
import Datepicker from "@vuepic/vue-datepicker";

export default {
  name: "AppointmentView",
  components: { Datepicker },
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        firstName(value) {
          if (value?.length >= 2) return true;

          return "First Name needs to be at least 2 characters.";
        },
        lastName(value) {
          if (value?.length >= 2) return true;

          return "Last Name needs to be at least 2 characters.";
        },

        // email(value) {
        //   if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

        //   return "Must be a valid e-mail.";
        // },

        bloodGroup(value) {
          if (value?.length <= 3) return true;

          return "Blood Group is a max of 3 letters.";
        },
        password(value) {
          if (value?.length >= 8) return true;

          return "Password needs to be at least 8 characters.";
        },
      },
    });
    const firstName = useField("firstName");
    const lastName = useField("lastName");
    const email = useField("email");
    const date = useField("date");
    const password = useField("password");
    const bloodGroup = useField("bloodGroup");

    const submit = handleSubmit(() => {
      this.submitApi();
    });

    return {
      email,
      firstName,
      lastName,
      date,
      bloodGroup,
      password,
      submit,
      handleReset,
    };
  },
  methods: {
    ...mapActions(["SetAppointment"]),
    async submitApi() {
      const Appointment = {
        DateTime: this.date.value.value,
      };

      try {
        console.log("try");
        await this.SetAppointment(JSON.stringify(Appointment));
        this.$router.push("/doctor");
        console.log("success");
      } catch (error) {
        console.log("error" + error);
        this.showError = true;
      }
    },
  },
  computed: {
    ...mapGetters({ Doctor: "StateDoctor" }),
  },
};
</script>
<style scoped>
.list{
list-style-type:none;}
</style>
