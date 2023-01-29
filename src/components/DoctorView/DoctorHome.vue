<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-2" outlined tile>Doctor's Home </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>
          One of two columns
          <v-container>
            <v-row>
              <v-col>
                <v-card class="pa-2" outlined tile>
                  One of three columns
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-2" outlined tile>
                  One of three columns
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-2" outlined tile>
                  One of three columns
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'DoctorHome',
  components: {},
};
</script>
