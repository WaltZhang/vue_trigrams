<template>
  <v-app>
    <nav-bar></nav-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    "nav-bar": Navbar
  },
  data() {
    return {
      //
    };
  }
};
</script>
