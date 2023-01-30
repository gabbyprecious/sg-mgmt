<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet rounded="lg " min-height="268" class="profile">
          <v-avatar color="primary" size="71">ON</v-avatar>

          <div class="biodata">
            <p>First Name:</p>
            <p>Last Name:</p>
            <p>Specialty:</p>
          </div>
        </v-sheet>
      </v-col>

      <v-col>
        <v-card class="pa-2" outlined tile>
          One of two columns
          <v-container>
            <v-row>
              <v-col>
                <v-card class="pa-2" outlined tile>
                  Book Appointment
                  <!-- <div class="posts" v-if="Posts"> -->
                    <div class="posts" v-if="true">
                    <v-list-item-action>
                      <!-- <v-checkbox
                        :input-value="active"
                        color="primary"
                        v-model="checkedusers"
                        :value="user"
                      ></v-checkbox> -->
                      <v-checkbox label="Checkbox"></v-checkbox>
                      <v-checkbox label="Checkbox"></v-checkbox>
                      <v-checkbox label="Checkbox"></v-checkbox>
                      <v-checkbox label="Checkbox"></v-checkbox>
                    </v-list-item-action>
                  </div>
                  <div v-else>
                    Oh no!!! Doctor does not have any free appointment date
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
