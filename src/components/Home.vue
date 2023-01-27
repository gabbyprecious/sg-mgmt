<template>
  <div class="home">
    <p>Heyyyyyy welcome to saint gabriel patient management system</p>

    <p>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <router-link to="/patient-home">Patient Home</router-link> |
    <router-link to="/login">Login</router-link>
  </p>

  </div>
</template>
<script>
export default {
  name: "GeneralHome",
  components: {},
};
</script>
