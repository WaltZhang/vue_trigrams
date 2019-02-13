<template>
  <v-card>
    <v-speed-dial
      v-model="fab"
      right
      absolute
      direction="left"
      transition="slide-y-reverse-transition"
    >
      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
        <v-icon>face</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn color="green" dark fab>
        <v-icon>add</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    };
  }
};
</script>

<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
