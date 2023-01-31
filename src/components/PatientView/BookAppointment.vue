<template>
  <v-row>
    <v-col>
      <v-card class="px-2 py-5" outlined tile>
        <p class="mb-5">Search for Doctor</p>
        <form @submit.prevent="submitApi">
          <v-text-field
            v-model="firstName.value.value"
            :counter="10"
            :error-messages="firstName.errorMessage.value"
            label="Specialty"
          ></v-text-field>

          <v-btn class="me-4" type="submit"> Search </v-btn>

          <v-btn @click="handleReset"> clear </v-btn>
        </form>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-2" outlined tile>
        Found Doctors
        <div class="posts" v-if="Posts">
          <ul>
            <li v-for="post in Posts" :key="post.id">
              <div id="post-div">
                <p>{{ post.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>Oh no!!! No Doctor was found yet</div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { useField, useForm } from 'vee-validate';
import '@vuepic/vue-datepicker/dist/main.css';
import { mapActions } from 'vuex';

export default {
  name: 'CreatePatient',
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        firstName(value) {
          if (value?.length >= 2) return true;

          return 'First Name needs to be at least 2 characters.';
        },
        lastName(value) {
          if (value?.length >= 2) return true;

          return 'Last Name needs to be at least 2 characters.';
        },
        bloodGroup(value) {
          if (value?.length <= 3) return true;

          return 'Blood Group is a max of 3 letters.';
        },
        password(value) {
          if (value?.length >= 8) return true;

          return 'Password needs to be at least 8 characters.';
        },
      },
    });
    const firstName = useField('firstName');
    const lastName = useField('lastName');
    const email = useField('email');
    const date = useField('date');
    const password = useField('password');
    const bloodGroup = useField('bloodGroup');

    const submit = handleSubmit(() => {
      console.log('submit');
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
    ...mapActions(['CreatePatient']),
    async submitApi() {
      console.log('submit');

      const Patient = {
        FirstName: this.firstName.value.value,
        LastName: this.lastName.value.value,
        Email: this.email.value.value,
        DOB: this.date.value.value,
        Password: this.password.value.value,
        BloodGroup: this.bloodGroup.value.value,
      };

      try {
        console.log('try');
        await this.CreatePatient(JSON.stringify(Patient));
        this.$router.push('/doctor');
        // this.showError = false
        console.log('success');
      } catch (error) {
        console.log('error' + error);
        this.showError = true;
      }
    },
  },
};
</script>
