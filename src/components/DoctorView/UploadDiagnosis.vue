<template>
  <v-container>
    <v-responsive max-width="800">
      <v-row>
        <v-col>
          <v-card class="pa-2" outlined tile>
            <form @submit.prevent="submitApi">

              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="Patient E-mail"
              ></v-text-field>

              <v-textarea
                v-model="result.value.value"
                :error-messages="result.errorMessage.value"
                auto-grow
                label="Result"
              ></v-textarea>

              <v-btn class="me-4" type="submit"> submit </v-btn>

              <v-btn @click="handleReset"> clear </v-btn>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
<script>
import { useField, useForm } from "vee-validate";
import { mapActions } from "vuex";

export default {
  name: "UploadDiagnosis",
  components: {},
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        result(value) {
          if (value?.length >= 20) return true;

          return "Result needs to be at least 20 characters.";
        },
      },
    });
    const result = useField("result");
    const email = useField("email");

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    return {email, result, submit, handleReset };
  },
  methods: {
    ...mapActions(["UploadDiagnosis"]),
    async submitApi() {
      console.log("submit");

      const Diagnosis = {
        PatientEmail: this.email.value.value,
        Result: this.result.value.value,
      };

      try {
        console.log("try");
        await this.UploadDiagnosis(JSON.stringify(Diagnosis));
        this.$router.push("/doctor");
        // this.showError = false
        console.log("success");
      } catch (error) {
        console.log("error" + error);
        this.showError = true;
      }
    },
  },
};
</script>
