<template>
    <div class="login">
      <div>
        <!-- <form @submit.prevent="submit"> -->
        <form>
          <div>
            <label for="Email">Email:</label>
            <input type="text" name="email" v-model="form.email" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="form.password" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <!-- <p v-if="showError" id="error">Email or Password is incorrect</p> -->
      </div>
    </div>
  </template>


<script>
import { mapActions } from "vuex";

export default {
  name: "LogIn",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.email);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          this.$router.push("/posts");
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>

  