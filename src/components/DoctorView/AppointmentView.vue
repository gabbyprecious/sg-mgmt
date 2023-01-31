<template>
  <v-row>
    <v-col>
      <v-card class="pa-2 mb-3" outlined tile>
        Booked Appointments
        <div class="posts" v-if="Posts">
          <ul>
            <li v-for="post in Posts" :key="post.id">
              <div id="post-div">
                <p>{{ post.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>Oh no!!! You don't have any booked appointment</div>
      </v-card>
      <v-card class="pa-2" outlined tile>
        Free Appointments Slots
        <div class="posts" v-if="Posts">
          <ul>
            <li v-for="post in Posts" :key="post.id">
              <div id="post-div">
                <p>{{ new Date(post.title).toLocaleTimeString() }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>Oh no!!! You don't have any free appointment</div>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="pa-2" outlined tile> Set Appointment Slots </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'PatientHome',
  components: {},
};
</script>
