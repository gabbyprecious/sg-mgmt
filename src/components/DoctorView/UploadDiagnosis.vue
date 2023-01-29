<template>
  <v-container>
    <v-responsive max-width="800">
      <v-row>
        <v-col>
          <v-card class="pa-2" outlined tile> One of two columns </v-card>
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
    </v-responsive>
  </v-container>
</template>
<script>
export default {
  name: 'PatientHome',
  components: {},
};
</script>
