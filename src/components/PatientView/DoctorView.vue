<template>
  <div class="container">
    <p>Hi {{ fullName }}</p>
    <div class="Doctors" v-if="Doctors">
      <ul>
        <li v-for="doctor in Doctors" :key="doctor.id">
          <div id="doctor-div">
            <p>{{ doctor.firstName }}</p>
            <p>{{ doctor.write_up }}</p>
            <p>Written By: {{ doctor.author.username }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Oh no!!! We have no Doctors</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DoctorView",
  components: {},
  data() {
    return {
      form: {
        title: "",
        write_up: "",
      },
    };
  },
  created: function() {
    // a function to call getDoctors action
    this.GetDoctors()
  },
  computed: {
    ...mapGetters({ Doctors: 'StateDoctors' }),
    fullName: function () {
      return "Hello" + " " + "World";
    },
  },
  methods: {
    ...mapActions(['GetDoctors']),
    async submitApi() {
      console.log('submit');

      try {
        console.log('try');
        await this.GetDoctors("cardio");
        console.log(this.$store.state.auth.doctors);
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

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  margin: 10px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

input {
  width: 60%;
  margin: 15px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}

textarea {
  width: 75%;
  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  height: 150px;
  margin: 15px;
}

ul {
  list-style: none;
}

#doctor-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;
}
</style>
