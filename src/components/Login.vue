<template>
  <div class="login">
    <v-responsive max-width="500">
      <v-card class="pa-6">
        <v-card-title class="pl-0">Login</v-card-title>

        <v-form @submit.prevent="submit">
          <!-- <div>
          <label for="Email">Email:</label>
          <input type="text" name="email" v-model="form.email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="form.password" />
        </div> -->
          <v-text-field
            v-model="form.email"
            :counter="10"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            label="Password"
            required
            type="password"
          ></v-text-field>

          <v-btn class="mr-4" large block color="primary" @click="submit"
            >Submit</v-btn
          >
          <!-- <button type="submit">Submit</button> -->
        </v-form>
        <p class="pt-4" v-if="showError" id="error">
          Email or Password is incorrect
        </p>
      </v-card>
    </v-responsive>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LogIn',
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      showError: false,
    };
  },
  methods: {
    ...mapActions(['LogIn']),
    async submit() {
      console.log('submit');

      const User = {
        email: this.form.email,
        password: this.form.password,
      };

      try {
        console.log('try');
        await this.LogIn(JSON.stringify(User));
        console.log('success');
        if (localStorage.getItem('role') === 'doctor') {
          this.$router.push('/doctor');
        } else if (localStorage.getItem('role') === 'patient') {
          this.$router.push('/patient-home');
        }
      } catch (error) {
        console.log('error' + error);
        this.showError = true;
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type='submit'] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
}
button[type='submit']:hover {
  background-color: #45a049;
}
input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}
#error {
  color: red;
}
</style>
