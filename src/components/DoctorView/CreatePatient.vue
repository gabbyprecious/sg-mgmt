<template>
  <v-responsive max-width="800">
    <v-card class="pa-2" outlined tile>
      <form @submit.prevent="submitApi">
        <v-text-field
          v-model="firstName.value.value"
          :counter="10"
          :error-messages="firstName.errorMessage.value"
          label="First Name"
        ></v-text-field>

        <v-text-field
          v-model="lastName.value.value"
          :counter="10"
          :error-messages="lastName.errorMessage.value"
          label="Last Name"
        ></v-text-field>

        <v-text-field
          v-model="bloodGroup.value.value"
          :counter="10"
          :error-messages="bloodGroup.errorMessage.value"
          label="Blood Group"
        ></v-text-field>

        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Patient E-mail"
        ></v-text-field>

        <Datepicker class="my-3" v-model="date.value.value"></Datepicker>

        <v-text-field
          label="Password"
          v-model="password.value.value"
          type="password"
          required
        ></v-text-field>

        <v-btn class="me-4" type="submit"> submit </v-btn>

        <v-btn @click="handleReset"> clear </v-btn>
      </form>
    </v-card>
  </v-responsive>
</template>

<script>
import { useField, useForm } from 'vee-validate';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { mapActions } from 'vuex';

export default {
  name: 'CreatePatient',
  components: { Datepicker },
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

        // email(value) {
        //   if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

        //   return "Must be a valid e-mail.";
        // },

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
